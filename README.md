# RouterAPI
Server URL: `127.0.0.1/8000/api`, every quest should have this serverURL and add the SuffixURL after it.  
For example if you wanna get the number of the images total, you should using GET to url: `http://127.0.0.1:8000/api/img_total`.

## Start
```bash
cd src
uvicorn main:app
```


## 1
Type: GET  
API: Get total images number  
SuffixURL: `/img_total`  
ReturnType: Json  

## 2
Type: GET  
API: Get the id image from backend  
SuffixURL: `/img/{pic_id}`  
ReturnType: File  

## 3
Type: POST  
API: Post the img from the client to server.  
SuffixURL: `/upload/`  
ReturnType: Json

## API Example 
if you are using react you you can use the api like:
```javascript
export async function GetCardNumber(){
    const res = await fetch(" http://127.0.0.1:8000/api/img_total");
    if (res.ok){
        const data = await res.json();
        return data.total;
    } else {
        console.log("GetCardsNumber Failed!");
        return 0;
    }
}
```



