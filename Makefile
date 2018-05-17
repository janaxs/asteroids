#!/usr/bin/env make
#
# Asteroids, a JavaScript game played in a web browser.
# See organisation on GitHub: https://github.com/janaxs

# ------------------------------------------------------------------------
#
# General stuff, reusable for all Makefiles.
#

# Detect OS
OS = $(shell uname -s)

# Defaults
ECHO = echo

# Make adjustments based on OS
ifneq (, $(findstring CYGWIN, $(OS)))
	ECHO = /bin/echo -e
endif

# Colors and helptext
NO_COLOR	= \033[0m
ACTION		= \033[32;01m
OK_COLOR	= \033[32;01m
ERROR_COLOR	= \033[31;01m
WARN_COLOR	= \033[33;01m

# Print out colored action message
ACTION_MESSAGE = $(ECHO) "$(ACTION)---> $(1)$(NO_COLOR)"

# Which makefile am I in?
WHERE-AM-I = $(CURDIR)/$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_MAKEFILE := $(call WHERE-AM-I)

# Echo some nice helptext based on the target comment
HELPTEXT = $(call ACTION_MESSAGE, $(shell egrep "^\# target: $(1) " $(THIS_MAKEFILE) | sed "s/\# target: $(1)[ ]*-[ ]* / /g"))

# Check version  and path to command and display on one line
CHECK_VERSION = printf "%-15s %-13s %s\n" "`basename $(1)`" "`$(1) --version $(2)`" "`which $(1)`"

# Get current working directory, it may not exist as environment variable.
PWD = $(shell pwd)

# target: help                    - Displays help.
.PHONY:  help
help:
	@$(call HELPTEXT,$@)
	@sed '/^$$/q' $(THIS_MAKEFILE) | tail +3 | sed 's/#\s*//g'
	@$(ECHO) "Usage:"
	@$(ECHO) " make [target] ..."
	@$(ECHO) "target:"
	@egrep "^# target:" $(THIS_MAKEFILE) | sed 's/# target: / /g'



# ------------------------------------------------------------------------
#
# Specifics for this project.
#

# The fileset
JS_FILES 	= src/js/asteroids.js
JS_MINIFIED = $(JS_FILES:.js=.min.js)

LESS_FILES 		= src/less/asteroids.less
LESS_COMPILED 	= $(LESS_FILES:.less=.css)
LESS_MINIFIED 	= $(LESS_FILES:.less=.min.css)

HTML_FILES	= $(wildcard *.html)

BIN = node_modules/.bin

#
# Tool to compile and minify less code
#
LESS_COMPILE			= $(BIN)/lessc
LESS_COMPILE_OPTIONS 	= 

LESS_MINIFY				= $(LESS_COMPILE)
LESS_MINIFY_OPTIONS 	= --clean-css

LESS_LINT				= $(LESS_COMPILE)
LESS_LINT_OPTIONS 		= --lint



# Tool to compile, check and minimize javascript code
JS_CODESTYLE 			= $(BIN)/jscs
JS_CODESTYLE_OPTIONS 	=

JS_LINT 				= $(BIN)/jshint
JS_LINT_OPTIONS 		=

JS_MINIFY 			= $(BIN)/uglifyjs
JS_MINIFY_OPTIONS 	= --mangle --compress --screw-ie8 --comments

JS_COMPILE 			= $(BIN)/webpack
JS_COMPILE_OPTIONS 	= --config .webpack.config.js



#
# Tool to lint HTML code
#
HTML_LINT 			= $(BIN)/htmlhint
HTML_LINT_OPTIONS 	= 



# target: install                 - Install development tools.
PHONY: install
install: 
	@$(call HELPTEXT,$@)
	npm install



# target: all - Default target, run tests and build
#all: test build
all: js-compile



# target: js-compile - Compile JavaScript.
PHONY: js-compile
js-compile: 
	@echo $(call HELPTEXT,$@)
	$(JS_COMPILE) $(JS_COMPILE_OPTIONS)



# ------------------------------------------------------------------------
#
# General and combined targets
#



# target: test - Do all tests
test: js-cs js-lint less-lint html-lint



# target: build - Do all build
build: less-compile less-minify js-minify



# target: clean - Removes generated files and directories.
clean:
	@echo "Target clean not implemented."
	#rm -f $(CSS_MINIFIED) $(JS_MINIFIED)



# ------------------------------------------------------------------------
#
# LESS
#

# target: less-compile - Compile LESS to CSS
less-compile: $(LESS_FILES) $(LESS_COMPILED)

%.css: %.less
	@echo "==> LESS compiling $<"
	$(LESS_COMPILE) $(LESS_COMPILE_OPTIONS) $< $@ 



# target: less-minify - Minify LESS files to min.css
less-minify: $(LESS_FILES) $(LESS_MINIFIED)

%.min.css: %.less
	@echo "==> LESS minifying $<"
	$(LESS_MINIFY) $(LESS_MINIFY_OPTIONS) $< $@



# target: less-lint - Lint LESS files
less-lint: $(LESS_FILES)
	@echo "==> LESS linting $<"
	$(LESS_LINT) $(LESS_LINT_OPTIONS) $<



# ------------------------------------------------------------------------
#
# JavaScript
#
.PHONY: js-cs js-lint 

# target: js-minify - Minify JavaScript files to min.js
js-minify: $(JS_FILES) $(JS_MINIFIED)

%.min.js: %.js
	@echo "==> Minifying $<"
	#$(JS_MINIFY) $(JS_MINIFY_OPTIONS) --output $@ $<



# target: js-cs - Check codestyle in javascript files
js-cs:
	@for file in $(JS_FILES); do \
		echo "==> JavaScript codestyle $$file"; \
		$(JS_CODESTYLE) $(JS_CODESTYLE_OPTIONS) $$file; \
	done



# target: js-lint - Lint javascript files
js-lint:
	@for file in $(JS_FILES); do \
		echo "==> JavaScript lint $$file"; \
		$(JS_LINT) $(JS_LINT_OPTIONS) $$file; \
	done
	@echo



# ------------------------------------------------------------------------
#
# HTML
#
.PHONY:	html-lint

# target: html-lint - Lint HTML files
html-lint:
	@for file in $(HTML_FILES); do \
		echo -n "==> HTML linting $$file"; \
		$(HTML_LINT) $(HTML_LINT_OPTIONS) $$file | grep -v "Config loaded: "; \
	done
