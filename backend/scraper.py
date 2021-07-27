from urllib.request import urlopen, Request
from bs4 import BeautifulSoup

hipcampCA = dict(url='https://www.hipcamp.com/en-CA/search/4-surfing?sw_lat=33.38550747060121&sw_lng=-123.6795430060038&ne_lat=38.850328084925025&ne_lng=-114.65244655044896&place_id=region.9803118085738010',
                 title_class='swiper-slide swiper-lazy swiper-lazy-loaded swiper-slide-next',
                 element_type='div',
                 )
hipcampSE = dict(url='https://www.hipcamp.com/en-CA/search/4-surfing?sw_lat=24.524004111532122&sw_lng=-83.62086793568311&ne_lat=37.43323032672376&ne_lng=-68.98878745529936&place_id=region.9803118085738010',
                 title_class='swiper-slide',
                 element_type='div',
                 )


def add_headers(headers):
    filename = 'location_seeding.csv'
    f = open(filename, 'w')
    f.write(headers)
    f.close()
    return


def scraper(website):
    url_to_scrape = website['url']
    title_class = website['title_class']
    element_type = website['element_type']

    req = Request(url_to_scrape, headers={"User-Agent": "Chromium/87.0"})

    request_page = urlopen(req)
    page_html = request_page.read()
    request_page.close()

    html_soup = BeautifulSoup(page_html, 'html.parser')

    elements = html_soup.find_all(element_type, class_=title_class)
    print(html_soup.discover_payload())

    filename = 'location_seeding.csv'
    f = open(filename, 'a')
    print(elements, element_type, title_class)

    for element in elements:
        img_src = element
        f.write(img_src + '\n')

    f.close()

    return


add_headers('Images \n')
scraper(hipcampCA)
scraper(hipcampSE)
