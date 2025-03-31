document.addEventListener("DOMContentLoaded", function(){
    function updt(){
        var fs = document.querySelectorAll("formula");
        fs.forEach(function(el){
            var ev = el.getAttribute("evaluator");
            if(!ev){
                el.textContent = "Formula Invalid";
                return;
            }
            try{
                var vars = ev.match(/\b[a-zA-Z_]\w*\b/g);
                if(vars){
                    vars = [...new Set(vars)];
                } else {
                    vars = [];
                }
                var vals = [];
                vars.forEach(function(v){
                    var ip = document.getElementById(v);
                    var num = ip ? parseFloat(ip.value) : 0;
                    if(isNaN(num)) num = 0;
                    vals.push(num);
                });
                var fn = new Function(...vars, "return " + ev + ";");
                var res = fn(...vals);
                el.textContent = res;
            } catch(e){
                el.textContent = "Formula Invalid";
            }
        });
    }
    var ips = document.querySelectorAll("input[type='text']");
    ips.forEach(function(ip){
        ip.addEventListener("input", updt);
    });
    updt();
});
