FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

ENV PORT=8080
ENV DB_HOST=brubtw1lchcvmy1pfgrj-postgresql.services.clever-cloud.com
ENV DB_DATABASE=brubtw1lchcvmy1pfgrj
ENV DB_USER=ug2hx50crgx5kobc5yc0
ENV DB_PASSWORD=QeDg5uIdi5AWmksBhbvRLVJ5ty37JB
ENV DB_URI=postgresql://ug2hx50crgx5kobc5yc0:QeDg5uIdi5AWmksBhbvRLVJ5ty37JB@brubtw1lchcvmy1pfgrj-postgresql.services.clever-cloud.com:5432/brubtw1lchcvmy1pfgrj
ENV EMAIL=mizuleofficial@gmail.com
ENV PASS=ygmmtqnpltbbpuwj
ENV BASE_URL=https://mizule.in/api
ENV SECRET=yfuhkdjcvdgsyhilugyfhidljfurelsjdgyjuwiadsiUCoydfugskhdaliteg7rwuqhelkfgiuyeudfogbikrhql3giudfhldwefigyulefkiugehdljafskyidgrufeoljbkdghyrieui

EXPOSE 8080
CMD ["npm","start"]