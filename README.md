#Wallet

Wallet is a personal finance app that allows users to link their bank accounts and instantly load all of their transactions. By having all of their transactions in one place, users can get a more holistic understanding of their finances

The backend of this repository can be found [here][https://github.com/aduranil/personal-finance-backend]
The demo for this repository can be found [here][http://personal-finance.surge.sh/]

##Features
**link multiple external accounts
**upload transactions via csv or other file upload
**transactions automatically labeled with category and merchant
**sort
**filter transactions by multiple categories (i.e. date, merchant, category, account) and multiple items within each category (i.e. merchant: Uber, Grubhub)
**visualize transactions by time, merchant, or category using graphs and word clouds

##Front end built with:
*React
*Redux
*React Router
*Recharts
*Plaid & PlaidLink
*Semantic UI
*Surge
*React d3 cloud
*Google fonts
*Custom CSS

##Back end built with:
*Ruby on Rails
*BCrypt & JWT tokens
*Heroku
*Paperclip file uploader
*Classifier Reborn
  * Bayes for online version
  * Latent Semantic Indexing for offline version
