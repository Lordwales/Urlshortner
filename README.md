# UrlShortner

UrlShortner is a simple service that helps you shorten your long URLs .

## Installation

1. clone the repo
2. type this command 
```bash
npm install
```
3. Create your .env file on the root folder with the following variables
```bash
PORT = PORT NUMBER
DATABASE_LOCAL = "YOUR MONGODB DATABASE CONNECTION STRING"'
BASEURL = http:localhost
```

4. type this command:
```bash
npm run start
```

## Test

Test is written in the test.js file in root folder

-Test 1 It should not post without initial field

-Test 2 It should create a shortUrl

-Test 3 It should not allow invalid url

-Test 4 It should redirect

```python
npm run test
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
