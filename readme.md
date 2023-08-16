
# Knowledge Test

Please read the knowledge test answer from below.

https://docs.google.com/document/d/1QW90uWASeEAVqWdFbCEFRBxO8GzUZrbFkryqolJIY9k/edit?usp=sharing


# Online Book Store Reporting API (Technical Test)

Book Store API for testing with Microservice 





![Flow Screenshot](https://i.imgur.com/hrhUIQo.png)


## Postman Collections

[API Collection](https://api.postman.com/collections/16523003-76afb575-72df-400a-96e9-a96bfa47ce64?access_key=PMAT-01H7YJET9GA77BFRTZJFYVYDVP)

[Postman Enviroment](https://drive.google.com/file/d/1ZehHnqB8aRBh1MfGD6YFA-2Vd5l2d1Uj/view?usp=sharing)
## Features

- Login (multi auth or normal auth)
- User List (can edit and delete)
- Book records (can edit and delete)
- Daily sales records (can edit and delete)
- Storing the feedback giving by the user



## Run Locally

Clone the project

```bash
  git clone https://github.com/saimain-primary/online-bookstore-reporting-nodejs-microservice-test.git
```

Go to the project directory

```bash
  cd online-bookstore-reporting-nodejs-microservice-test
```

Install dependencies and start the servers

```bash
  cd user
  npm install
  npm run dev
```

```bash
  cd book
  npm install
  npm run dev
```

```bash
  cd sale
  npm install
  npm run dev
```

```bash
  cd feedback
  npm install
  npm run dev
```

```bash
  cd gateway
  npm install
  npm start
```




## Environment Variables

To run this projects, you will need to add the following environment variables to your .env & .env.dev file

`APP_SECRET`

`MONGODB_URI`

`PORT`



## Notes

.env နဲ့ .env.dev မှာ Port နဲ့ Database ကို လိုအပ်သလိုပြောင်းပြီး Run လို့အဆင်ပြေပါတယ်။ လက်ရှိပါတော့ User API အတွက် Port `8001` မှာ run ပြီး Book API အတွက် Port `8002` မှာ run ထားပါတယ်။ Sale API ကို Port `8003` မှာ run ပြီး Feedback API ကို Port `8004` မှာ run ထားပါတယ်။

API Gateway ကိုတော့ Port `8000` မှာ run ထားပါတယ်။

Database ကတော့ အကုနလုံး သီးခြားဆီ သုံးထားပါတယ်။


## Support

For support, email saimain.primary@gmail.com.

