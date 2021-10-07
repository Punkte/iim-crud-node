import puppeteer from 'puppeteer'
import { MongoClient } from 'mongodb'

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.vinted.fr/vetements?popular=true', {'timeout': 10000, 'waitUntil':'load'});
  const d = await page.evaluate(() => {
    const data = [...document.querySelectorAll('.feed-grid__item-content')].map(el => {
      return {
          image: el.querySelectorAll('img')[1].src,
          name: el.querySelector('[class^=ItemBox_details]').innerText,
          price: parseFloat(el.querySelector('[class^=ItemBox_title-content]').innerText),
          description: 'une description'
      }
    })
    return data
  })

  const mongoclient = new MongoClient('mongodb://admin:adminpwd@localhost:27017/twidb?authSource=admin');
  const db = mongoclient.db("twidb");
  mongoclient.connect(async (err, client) => {
    if (err) return console.log(err);
    console.log('yolo')

    await db.collection("articles").insertMany(d, (err, result) => {
      console.log(result)
    })
  })

  await browser.close();
})();