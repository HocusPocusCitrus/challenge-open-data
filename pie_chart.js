const pieChartContainer=document.getElementById("pie-chart-container"),pieChartContainerPadding=parseFloat(window.getComputedStyle(pieChartContainer,null).getPropertyValue("padding").replace("px","")),pieChartWidth=pieChartContainer.clientWidth-2*pieChartContainerPadding,pieChartHeight=pieChartContainer.clientHeight-2*pieChartContainerPadding;var radius=Math.min(pieChartWidth,pieChartHeight)/2;const pieChartTitle=document.getElementById("pie-chart-title");var pieChartSvg=d3.select("#pie-chart").append("g");pieChartSvg.append("g").attr("class","slices"),pieChartSvg.append("g").attr("class","labels"),pieChartSvg.append("g").attr("class","lines");var arc=d3.arc().outerRadius(.6*radius).innerRadius(0);pieChartSvg.attr("transform","translate("+(pieChartWidth+pieChartContainerPadding)/2+","+((pieChartHeight+pieChartContainerPadding)/2+10)+")");var key=function(t){return t.data.key},pieChartColor=d3.scaleOrdinal().range(["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#808080"]);function removePieChart(){pieChartSvg.selectAll(".slices path").remove(),pieChartSvg.selectAll(".lines line").remove(),pieChartSvg.selectAll(".labels text").remove(),pieChartNoDataText.attr("opacity",1).attr("pointer-events","")}const pieChartNoDataText=pieChartSvg.append("text").attr("text-anchor","middle").attr("font-size","2em").attr("font-weight","bold").attr("dy","0.25em").text("No data"),pieChartTooltip=d3.select("body").append("div").attr("class","map-tooltip").style("opacity",0);function updatePieChart(t,e,a){pieChartTitle.innerHTML=`Global share of oil ${e} in ${yearSlider.value}`;let r={};if(total=t.OWID_WRL[e],total){if(0===a.length){r=JSON.parse(JSON.stringify(t)),delete r.OWID_WRL,r=Object.entries(r).sort(((t,a)=>a[1][e]&&t[1][e]?a[1][e]-t[1][e]:a[1][e]?1:-1)),r=r.slice(0,5),sum=0;for(let t=0;t<r.length;t++){if(!r[t][1][e])return void removePieChart();sum+=r[t][1][e]}r=Object.fromEntries(r)}else if(sum=0,a.forEach((a=>{t[a]&&e in t[a]&&(r[a]=t[a],sum+=t[a][e])})),0===sum)return void removePieChart();pieChartNoDataText.attr("opacity",0).attr("pointer-events","none"),r.OWID_WRL={country:"Others"},r.OWID_WRL[e]=total-sum;var i=d3.pie().value((function(t){return t.value[e]}))(d3.entries(r)),n=pieChartSvg.select(".slices").selectAll("path.slice").data(i);n.enter().insert("path").merge(n).on("mouseover",(function(t){var a;pieChartSvg.selectAll("path").style("opacity",.5),d3.select(this).style("opacity",1).style("stroke","black"),pieChartTooltip.style("left",d3.event.pageX+15+"px").style("top",d3.event.pageY-28+"px").transition().duration(400).style("opacity",1).text(`${t.data.value.country} (${a=t.data.value[e],(a/total*100).toFixed(2)}%)`)})).on("mouseout",(function(t){pieChartTooltip.transition().duration(300).style("opacity",0),d3.select("#pie-chart").style("cursor","default"),d3.selectAll("#pie-chart path").style("opacity",1).style("stroke","transparent"),d3.select("#pie-chart").select(".tooltip").remove()})).transition().duration(1e3).attrTween("d",(function(t){this._current=this._current||t;var e=d3.interpolate(this._current,t);return this._current=e(0),function(t){return arc(e(t))}})).style("fill",(function(t){return pieChartColor(t.index)})).attr("class","slice"),n.exit().remove();var o=pieChartSvg.select(".labels").selectAll("text").data(i),l=pieChartSvg.select(".lines").selectAll("line").data(i),s=.8*radius;o.enter().append("text").merge(o).text((function(t){return t.data.value.country})).attr("x",(function(t,e){var a=arc.centroid(t),r=Math.atan2(a[1],a[0]),i=Math.cos(r)*s;return i+5*(i>0?1:-1)})).attr("y",(function(t,e){var a=arc.centroid(t),r=Math.atan2(a[1],a[0]);return Math.sin(r)*s})).attr("text-anchor",(function(t,e){var a=arc.centroid(t),r=Math.atan2(a[1],a[0]);return Math.cos(r)*s>0?"start":"end"})).attr("class","label-text"),l.enter().append("line").merge(l).attr("x1",(function(t){var e=arc.centroid(t),a=Math.atan2(e[1],e[0]);return Math.cos(a)*arc.outerRadius()(t)})).attr("y1",(function(t){var e=arc.centroid(t),a=Math.atan2(e[1],e[0]);return Math.sin(a)*arc.outerRadius()(t)})).attr("x2",(function(t){var e=arc.centroid(t),a=Math.atan2(e[1],e[0]),r=Math.cos(a)*s;return r+5*(r>0?1:-1)})).attr("y2",(function(t){var e=arc.centroid(t),a=Math.atan2(e[1],e[0]);return Math.sin(a)*s})).attr("class","label-line").attr("stroke",(function(t){return pieChartColor(t.index)}));!function t(){var e=!1,a=pieChartSvg.select(".labels").selectAll("text");if(a.each((function(t,r){var i=this,n=d3.select(i),o=n.attr("y");a.each((function(t,a){if(i!==this&&(db=d3.select(this),n.attr("text-anchor")===db.attr("text-anchor"))){var r=db.attr("y");if(deltaY=o-r,!(Math.abs(deltaY)>20)){e=!0,sign=deltaY>0?1:-1;var l=.8*sign;n.attr("y",+o+l),db.attr("y",+r-l)}}}))})),e){var r=o.nodes();l.attr("y2",(function(t,e){return d3.select(r[e]).attr("y")})),setTimeout(t,20)}}(),l.exit().remove(),o.exit().remove()}else removePieChart()}