from flask import Flask, request, jsonify, g

app = Flask(__name__)

def get_fii_news(data):
    if 'fii' not in g:
        g.fii = FIINews(data)
    return g.fii

@app.route('/', methods=['POST'])
def get_news():
    data = request.json
    fii_news = get_fii_news(data)
    news_list = fii_news.get_all_news()
    return jsonify(news_list)
