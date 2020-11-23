from bs4 import BeautifulSoup
import requests

html_text = requests.get(
    'https://www.indeed.com/jobs?q=react%20developer&explvl=entry_level&sort=date&fromage=14&limit=50').text

soup = BeautifulSoup(html_text, 'lxml')

# Determines the total number of jobs. Indeed inflates this number with advertised and duplicate postings though.
# Best to round down a bit.
page_count = soup.find('div', id='searchCountPages').text.strip()
page_count = page_count.replace('Page 1 of ', '')
page_count = int(page_count.replace(' jobs', ''))
page_count = round(page_count / 50)
if (page_count == 0):
    page_count = 1
elif (page_count > 5):
    page_count = 5

# Write the first page of results to an html file
file_name = "indeed0.html"
new_file = open(file_name, 'w')
new_file.write(html_text)
new_file.close()

# Write any subsequent pages to html
# &start=X Determines page number (Xth job, 50, 100, 150 ...)
for i in range(1, page_count):
    url = 'https://www.indeed.com/jobs?q=react%20developer&explvl=entry_level&sort=date&fromage=14&limit=50' + \
        '&start=' + str(i * 50)
    html_text = requests.get(url).text
    file_name = "indeed%s.html" % str(i)
    new_file = open(file_name, "w")
    new_file.write(html_text)
    new_file.close()
