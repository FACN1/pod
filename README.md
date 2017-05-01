# pod
Payment Ease: POS Transactions Simplified

#### Prototype Links: (two versions)
- https://xd.adobe.com/view/0582c5d1-592c-4697-8d87-7333927a849b/
- https://xd.adobe.com/view/81c5b485-d346-4bca-aa43-6ac30fd6255b/

#### MVP User Journey

As a consumer:
> I want to be able to buy items in a shop using my phone.

#### MVP User Stories

As a consumer:
> Be able to start a shopping experience when entering a shop.

> Add/remove/update items quickly in my shopping cart.

> View details of my shopping experience.

> Automatically pay for my purchases when I leave the shop.

#### File Structure
- public
  - \_sass/
    - main.scss
  - assets/
    - css/
      - main.css
    - js/
      - main.js
- src
  - routes/
    - index.js
    - home.js
    - static.js
  - views/
    - helpers/
    - layouts/
      - default.hbs
    - partials/
    - index.hbs
  - server.js
- database
  - db_build.sql
  - db_build.js
  - db_connection.js

- tests
  - client
  - server


#### Technology

**Front End:**
- Web Components
- SASS - npm node-sass
- Browser APIs:
  - Geolocation API
  - Media storage - camera

**Back End:**
- Hapi
- Handlebars
- APIs:
  - Google Cloud Vision

#### Database Schema

**shops**

| ***Columns***  | ***Parameters  ***   |
| :------------- | :------------------  |
|       id       |  PRIMARY KEY SERIAL  |
|      name      | VARCHAR(255) NOT NULL|
|    location    |         JSONB        |

**items**

| ***Columns***  |         ***Parameters  ***         |
| :------------- | :--------------------------------  |
|       id       |         PRIMARY KEY SERIAL         |
|     shop_id    |  references shops(id) INT NOT NULL |
|      name      |        VARCHAR(100) NOT NULL       |
|   description  |            VARCHAR(255)            |
|      price     |               NUMERIC              |
