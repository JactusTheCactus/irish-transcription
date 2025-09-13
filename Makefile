.PHONY: all post pre run

all : pre run post

pre :
	@clear

run : $(wildcard *.js *.json)
	@clear
	@node scripts/script.js
	@node scripts/readme.js
	@echo

post :