# docker

```
docker-compose up -d  --build

docker exec -it {containe_name} sh

```



# clasp 


```

npm install @types/google-apps-script

clasp login --no-localhost

clasp create --title clasp-sample-project --parentId {GoogleDriveのフォルダID} --rootDir ./gas


```

.clasp.jsonに下記を追加

```
"fileExtension": "ts"
```
