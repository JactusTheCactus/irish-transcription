.PHONY: all run

all : run

run : $(wildcard *.js *.json)
	@clear
	@node script.js
	@echo