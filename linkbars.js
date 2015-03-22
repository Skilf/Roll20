/**
 * Linkbars v0.1
 * 
 * Sets the values of the bars of a token to the specified
 * attributes of the linked character sheet
 */
 
var linkbars = linkbars || {};

// USER CONFIG
// Set the attribute you want on each bar 
// and whether you want the bar to be linked to the character sheet or not
linkbars.config = {
        bar1:      "npc_HP",
        bar1_link: false,
        bar2:      "npc_AC", 
        bar2_link: true,
        bar3:      "npc_speed",
        bar3_link: true
    }
// END USER CONFIG    
    
linkbars.process = function(msg){

    var obj = msg.selected;
                
    if (!obj) { return; }
    _.each(obj, function(selected) {    
        linkbars.run(selected._id);
       
    });
}

linkbars.run=function(selected){
    var token = getObj('graphic', selected);
    var id = token.get('represents');
    var char = getObj("character",id);
    // set Token name to Character name
    token.set("name", char.get("name"));
    // link/set bar value
    linkbars.link(token, id, "bar1");
    linkbars.link(token, id, "bar2");
    linkbars.link(token, id, "bar3");
    
}

linkbars.link=function(token, id, bar){
    
    var attr_name = linkbars.config[bar];
    var attr_link = linkbars.config[bar+"_link"];
    var val= getAttrByName(id, attr_name)
    var max_val = getAttrByName(id, attr_name, "max")
    
    if ((attr_link===true)&&(attr_name!="")){
        
        var aSet = findObjs({_type: "attribute",name: attr_name,_characterid: id});
        aSet = aSet[0].id;
        token.set(bar+"_link", aSet);
    }
    token.set(bar+"_max", max_val);
    token.set(bar+"_value", val);
    
    
}



on("chat:message", function(msg) {
    if (msg.type == "api" && msg.content.indexOf("!linkbars") !== -1) {
        linkbars.process(msg);
	} 


});
