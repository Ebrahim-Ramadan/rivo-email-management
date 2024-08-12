## One issue I had
I am deploying this very [simple one-endpoint Express api](https://github.com/Ebrahim-Ramadan/rivo-email-management) on vercel according to [the rules here](https://vercel.com/guides/using-express-with-vercel), configured my vercel.json and eveything works just fine in dev too. the only problem is having this annoying 'authenticating page' as response from postman to the build URL
![image|690x499](upload://vuK86qSpC4W39E2zxyFuifdUGMx.png)
this is the same response I get when visiting the URL first time in the browser, like this 
![image|690x387](upload://xy3ILlk5Rc9rulk5QmkkgZbt2lj.jpeg)
<br/>

I clearly didn't know how to fix it or just skip it, So I posted on [twt](https://x.com/scoopsahoykid/status/1822953677637787673) and [vercel community](https://vercel.community/t/express-js-deployment-on-vercel-bug/545).
<br/>

## the solution:
turned out I was trying with the build url itself, just tried the main url worked just fine, see [this for rer](https://x.com/_Abdo_Salem/status/1822964164001735083)