import requests
from bs4 import BeautifulSoup

url_base = 'http://www2.bmfbovespa.com.br/Agencia-Noticias/'
url = url_base + 'ListarNoticias.aspx'

def get_pages(txt, q):
    q = q + ': '
    i = txt.find(q) + len(q)
    f = txt[i:].find(',')
    return txt[i:][:f]

def get_news(pag, query):
    params = {
        'idioma': 'pt-br',
        'q': query,
        'pg': pag,

        # refers to date interval
        # 0 => ultimo dia
        # 1 => ultima semana
        # 2 => ultimo mes
        # 3 => De - ate
        'tipoFiltro': '2',

        # only available if tipoFiltro == 3
        #'periodoDe': '2019-10-02',
        #'periodoAte': '2019-10-02',
    }

    res = requests.get(url, params=params)
    txt = res.text
    itemsCount = int(get_pages(txt, 'itemsCount'))
    pageSize = int(get_pages(txt, 'pageSize'))
    pages = int(itemsCount / pageSize)

    html = BeautifulSoup(res.text, 'html.parser')
    news_lis = html.select('#linksNoticias li')
    news = []

    for li in news_lis:
        a = li.select('a')[0]
        content = a.get_text()
        spl = content.split('-')
        date_i, time = spl[0].split()
        date_f = spl[-1].split()[0]
        title = spl[1].lstrip()

        for i in range(1, len(spl) - 1):
            title += '-' + spl[i].rstrip()

        news.append({
            'link': url_base + a['href'],
            'title': title,
            'date_i': date_i,
            'date_f': date_f,
        })

    return {
        'pages': pages,
        'news': news,
    }

class FIINews:
    def __init__(self, terms):
        self.news_list = {}
        for t in terms:
            self.news_list[t] = []

    def get_all_news(self):
        for k in self.news_list.keys():
            r = get_news(1, k)
            self.news_list[k].extend(r['news'])
            for i in range(r['pages']):
                r = get_news(i, k)
                self.news_list[k].extend(r['news'])

        return self.news_list
