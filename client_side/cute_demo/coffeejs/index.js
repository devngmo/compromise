// Generated by CoffeeScript 1.6.3
var arr;

arr = ["./libs/jquery.js", "./libs/sugar.js", "./libs/oj.js", "./libs/dirty.js", "./libs/nlp.js", "./libs/freebase.min.js"];

head.js.apply(this, arr);

head(function() {
  var colours, key, set_text, show_topic;
  oj.useGlobally();
  window.freebase = $.freebase;
  colours = {
    noun: "steelblue",
    verb: "olivedrab",
    adjective: "coral",
    adverb: "rosybrown",
    glue: "grey"
  };
  key = "AIzaSyD5GmnQC7oW9GJIWPGsJUojspMMuPusAxI";
  show_topic = function(obj) {
    if (obj == null) {
      obj = {};
    }
    if (!obj.id) {
      return;
    }
    return span({
      style: "display:inline-block; margin:15px;"
    }, function() {
      var done, text, tmp;
      img({
        style: "border:1px solid steelblue; border-radius:5px",
        src: "https://usercontent.googleapis.com/freebase/v1/image" + obj.id + "?key=" + key + "&maxwidth=200"
      });
      tmp = obj.output.description['/common/topic/description'] || [];
      done = nlp.pos(tmp[0]);
      text = done[0].text();
      return div({
        style: "width:400px;"
      }, function() {
        return text;
      });
    });
  };
  set_text = function(tokens, el) {
    var ojarr;
    if (tokens == null) {
      tokens = [];
    }
    ojarr = span(function() {
      return tokens.map(function(t) {
        if (t.pos.parent === "noun") {
          return span({
            style: "position:relative; color:" + colours[t.pos.parent] + "; cursor:hand;",
            click: function() {
              return $(this).find(".hide").toggle();
            }
          }, function() {
            span({
              style: ""
            }, function() {
              return " " + t.text + " ";
            });
            span({
              style: "position:absolute; bottom:5px; left:5%; width:80%; border-radius:3px; height:3px; background-color:" + colours[t.pos.parent] + ";"
            });
            return span({
              "class": "hide",
              style: " display:none; padding:2px 5px 2px 5px; position:absolute; font-size:18px; bottom:-35px; left:70%; border-radius:3px; background-color:" + colours[t.pos.parent] + "; color:white; cursor:pointer; opacity:0.8;",
              click: function() {
                return freebase.search(t.text, {
                  output: "(description)",
                  limit: 1,
                  key: key
                }, function(arr) {
                  var o;
                  if (arr == null) {
                    arr = [];
                  }
                  console.log(arr);
                  o = arr[0] || {};
                  return $("#answer").oj(show_topic(o));
                });
              }
            }, function() {
              return "about";
            });
          });
        } else if (t.pos.parent === "verb") {
          span({
            style: "position:relative; color:" + colours[t.pos.parent] + ";"
          }, function() {});
          return span({
            style: "position:relative; color:" + colours[t.pos.parent] + "; cursor:hand;",
            click: function() {
              return $(this).find(".hide").toggle();
            }
          }, function() {
            span(function() {
              return " " + t.text + " ";
            });
            span({
              style: "position:absolute; bottom:5px; left:5%; width:80%; border-radius:3px; height:3px; background-color:" + colours[t.pos.parent] + ";"
            });
            span({
              "class": "hide",
              style: "display:none; padding:2px 5px 2px 5px; position:absolute; font-size:18px; top:-35px; left:-20px; border-radius:3px; background-color:" + colours[t.pos.parent] + "; color:white; cursor:pointer; opacity:0.8;",
              click: function() {
                var done, fixed;
                el = $("#text");
                el.find('.hide').remove();
                done = nlp.pos(el.text());
                fixed = done[0].to_past().text();
                el.text(fixed);
                return el.keyup();
              }
            }, function() {
              return "past";
            });
            span({
              "class": "hide",
              style: "display:none; padding:2px 5px 2px 5px; position:absolute; font-size:18px; top:-35px; left:40px; border-radius:3px; background-color:" + colours[t.pos.parent] + "; color:white; cursor:pointer; opacity:0.8;",
              click: function() {
                var done, fixed;
                el = $("#text");
                el.find('.hide').remove();
                done = nlp.pos(el.text());
                fixed = done[0].to_future().text();
                el.text(fixed);
                return el.keyup();
              }
            }, function() {
              return "future";
            });
            return span({
              "class": "hide",
              style: "display:none; padding:2px 5px 2px 5px; position:absolute; font-size:18px; bottom:-35px; left:70%; border-radius:3px; background-color:" + colours[t.pos.parent] + "; color:white; cursor:pointer; opacity:0.8;",
              click: function() {
                var done, fixed;
                el = $("#text");
                el.find('.hide').remove();
                done = nlp.pos(el.text());
                fixed = done[0].negate().text();
                el.text(fixed);
                return el.keyup();
              }
            }, function() {
              return "negate";
            });
          });
        } else if (t.pos.parent === "adverb") {
          return span({
            style: "position:relative; color:" + colours[t.pos.parent] + ";"
          }, function() {
            return span(function() {
              return t.text + " ";
            });
          });
        } else {
          return span({
            style: "position:relative; color:" + colours[t.pos.parent] + ";"
          }, function() {
            return span(function() {
              return t.text + " ";
            });
          });
        }
      });
    });
    return el.oj(ojarr);
  };
  $("#main").oj(div({
    style: "position:relative; text-align:left; color:grey;"
  }, function() {
    h2({
      style: "position:relative; left:10px;"
    }, function() {
      return "  nlp compromise";
    });
    return ul(function() {
      div({
        id: "text",
        style: "position:relative; padding:10px; left:25px; height:45px; border:1px solid lightsteelblue; color:steelblue; overflow-x: visible; font-size:30px; width:600px;",
        contentEditable: "true",
        keyup: (function() {
          var done, el, tokens, txt;
          el = $("#text");
          el.find('.hide').remove();
          txt = el.text();
          done = nlp.pos(txt);
          tokens = done[0].tokens;
          console.log(done[0]);
          el.html('');
          return set_text(tokens, el);
        }).debounce(500)
      }, function() {
        return "joe carter plays patiently in toronto";
      });
      return div({
        id: "answer"
      });
    });
  }));
  return $("#text").keyup();
});

/*
//@ sourceMappingURL=index.map
*/
