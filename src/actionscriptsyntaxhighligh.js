
define(function (require, exports, module) {
	'use strict';	

	var LanguageManager = brackets.getModule("language/LanguageManager");
	var CodeMirror 		= brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
	var lexer = require('src/lexer');

	var tokenizer = function(stream, state) {
    var token, sliced = stream.string.slice(stream.pos);
      try {
        token = lexer.tokenise(sliced)[0];
        if(!token[1].length) {
          stream.next();
          return;
        }
        stream.pos += sliced.match(/\s*/)[0].length + token[1].length;
      } catch(e) {
        stream.next();
        return;
      }

      switch(token[0]) {

        case 'LET':
        case 'THEN':
        case 'ELSE':
        case 'DATA':
        case 'TYPE':
        case 'MATCH':
        case 'MACRO':
        case 'WHERE':
        case 'PRIVATE':
        case 'PUBLIC':
        case 'CLASS':
        case 'ARRAY':
        case 'INT':
        case 'IMPORT':
        case 'FUNCTION':
        case 'MOVIECLIP':
        case 'OBJECT':
        case 'LOADER':
        case 'URLREQUEST':
        case 'SHAPE':
        case 'EVENT':
        case 'COMPLETE':
        case 'SPRITE':
        case 'ADDCHILD':
        case 'URLREQ':
        case 'ADDEVENTLISTENER':
        case 'LOAD':
            return 'keyword';
        case 'IMPORT':
        case 'VAR':
        case 'NEW':
        case 'EXTENDS':
        case 'CONTENTLOADERINFO':

            return 'directive';
        case 'BOOLEAN':
        case 'BREAK':
        case 'CASE':
        case 'CONTINUE':
        case 'DEFAULT':
        case 'DO':
        case 'WHILE':
        case 'ELSE':
        case 'FOR':
        case 'IN':
        case 'EACH':
        case 'IF':
        case 'LABEL':
        case 'RETURN':
        case 'SUPER':
        case 'SWITCH':
        case 'THROW':
        case 'TRY':
        case 'CATCH':
        case 'FINALLY':
        case 'WITH':
            return 'builtin';
      }
      return token[0].toLowerCase();
    };

    CodeMirror.defineMode("actionscript", function(config, parserConfig) {
      return {
        token: tokenizer
      };
    });



/*
	CodeMirror.defineMode("actionscript", function (config, parserConfig) {
		
		var actionscriptOverlay = {
			
			token: function(stream, state) {
				var ch;
				
				//Laravel Comment Syntax (Single Line only)
				if (stream.match("{{--")) {
					while ((ch = stream.next()) != null)
						if (ch == "}" && stream.next() == "}") break;
					stream.eat("}");
					return "comment";
				}
				
				//Laravel5 Echo Syntax
				if (stream.match("{%")) {
					while ((ch = stream.next()) != null)
						if (ch == "%" && stream.next() == "}") {
							stream.eat("}");
							return "def";
						}
				}
				
				//Laravel Echo Syntax
				if (stream.match("{{")) {
					while ((ch = stream.next()) != null)
						if (ch == "}" && stream.next() == "}") {
							stream.eat("}");
							return "def";
						}
				}
				
				
				
				while (stream.next() != null && 
					   !stream.match("{--", false) && 
					   !stream.match("{%", false) && 
					   !stream.match("{{", false)
					  ) {}
				return null;
					   
			}
		  };
		  return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "as"), actionscriptOverlay);
	});
*/

	LanguageManager.defineLanguage("actionscript", {
		"name": "ActionScript",
		"mode": "actionscript",
		"fileExtensions": ["as"],
		"blockComment": ["{{/*", "*/}}"]
	});
});
