#!/bin/zsh

# D1のデータベースを作成するスクリプト.
# これで得られたdatabase_idを wrangler.tomlに入れる

npx wrangler d1 create bibliophilia-db
