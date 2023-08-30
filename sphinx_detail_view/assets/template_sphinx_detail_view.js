
var sp_active = false;
var needData = {};
$(window).on('load', (function () {
  $.getJSON( "/.build/needs.json", function( data ) {
    needData = data;
    console.log(`data:${JSON.stringify(data)}`);
  });
  console.log(`need_data:${JSON.stringify(needData)}`);
  var sp_active = false;
  var config = {{ config }};
  if (config.set_icon) {
    $(config.selector).not(config.not_selector).each(function () {
      // aReq = $(this).children("span:nth-child(2)");
      aReq = $(this).find("span.needs-id > a");
      console.log(`aReq:${JSON.stringify(aReq)}`);
      var id = aReq.attr("title");
      if(typeof(id) == 'undefined'){
        aReq = $(this).parent().parent().parent().parent().find("span.needs-id > a");
        console.log(`aReqtable:${JSON.stringify($(this).parent().parent().parent().parent().find("span.needs-id > a"))}`)
        id = aReq.attr("title");
      }
      console.log(`id:${id}`);
      let node_string = `<span id=${id} class="sp_detail_view_icon" data-sp-link=" ` + $(this).attr('href') + '">' + config.icon + '</span>'
      let node_detail_view = '<div id="detail_view" class="overlay"></div>'

      if (config.icon_click) {
        $(this).append(node_string);
        $(node_detail_view).insertAfter($(this));
      } else {
        $(this).append(node_string);
        $(node_detail_view).insertAfter($(this))
      }
    })
  }

  let selector = '';
  if (config.set_icon) {
    selector = 'span.sp_detail_view_icon'
    if (config.icon_click) {
      $(selector).on('click', config, openNav);
    }
    else {
      $(selector).on('mouseover', config, openNav);

    }

  }
  if (config.icon_only === false) {
    selector = config.selector;
    $(selector).mouseover(config, openNav);
  }
}));

function convertRequirement() {
  let version = String(needData["current_version"]);
  let needsObj = needData["versions"][version]["needs"];
  let needs = Object.values(needsObj);
  let requirements = needs.map((item) => {
    return {
      id: item.id,
      title: item.full_title,
      status: item.status,
      type: item.type,
      tags: item.tags,
      allocates: item.allocates,
      allocates_back: item.allocates,
      // arch: item.arch,
      architecture: item.architecture,
      content_id: item.content_id,
      da_safety_integrity: item.da_safety_integrity,
      da_verification_criteria: item.da_verification_criteria,
      derives: item.derives,
      description: item.description,
      docname: item.docname,
      doctype: item.doctype,
      external_css: item.external_css,
      full_title: item.full_title,
      id_complete: item.id_complete,
      id_parent: item.id_parent,
      implements_back: item.implements_back,
      is_external: item.is_external,
      is_modified: item.is_modified,
      is_need: item.is_need,
      is_part: item.is_part,
    }
  });
  return requirements;
}

function openNav() {
  document.getElementById("detail_view").style.width = "18%";
  // var config = event.data;
  var requirements = convertRequirement();
  $("#detail_view").empty();
  $("#detail_view").append(`<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>`);
  var id = $(this).attr("id");
  if (id){
    let obj = requirements.find(item => item.id === id);
    console.log(`obj:${JSON.stringify(obj)}`);
    if (obj){
      let content = "";
      Object.keys(obj).forEach(function(key){
        let value = obj[key];
        if (typeof(value) == 'undefined'){
          value = "";
        }
        if (key.includes("id")){
          
          content+= `<div>${key}:<span> <a href='#${value}'>${value}</a><span></div>`
     
        }
        else{
          content+= `<div>${key}: ${value}</div>`
        }
        
      });
      $("#detail_view").append(`<div class="overlay-content"> ${content}</div>`);
    }
  }
}

function closeNav() {
  document.getElementById("detail_view").style.width = "0%";
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}
