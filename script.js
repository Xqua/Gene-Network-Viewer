//example
// You can replace selectAll("circle") by selectALL("something") to see what happends
// if you try that click hint to see some explaination.

//write your own code here
/*var some = d3.select("#Network").selectAll('circle')
    .data([40,50,60,70]);
    
some.enter().append("circle")
    .attr("cx",function(d,i){return d+(i*d)+30})
    .attr("cy",function(d,i){return d+(i*d)+30})
    .attr("r",function(d){return d})
    .style('fill','blue');*/


var width = screen.availWidth/2,
    height = screen.availHeight;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg_net = d3.select("#plotright").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "Network");

var svg_plot = d3.select("#plotleft").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "Scatter");

//Holds the list of nodes to be displayed 
var curNodes = []
//Holds the list of selected nodes from the scatter plots
var selectedNodes = []

function update()
{

	curNodes = get_nodes();
	curLinks = get_links();
}

function get_nodes()
{
	Nodes_list = [];
	for (var n=0;n<selectedNodes.length;n++)
	{
		links = d3.data(graph.links).filter(function (d) {return d.source == selectedNodes[n]});
		if (jQuery.inArray(selectedNodes[n], Nodes_list) > -1) 
		{
		Nodes_list.push(selectedNodes[n]);
		};
		for (var i=0;i<links.length;i++)
		{
			if (jQuery.inArray(links[i].target, Nodes_list) > -1) 
			{
			Nodes_list.push(links[i].target);
			};
		};
	};
	curNodes = d3.data(graph.nodes).filter(function(d) {jQuery.inArray(d, Nodes_list)});
	return curNodes;
}

function get_links()
{
	links = d3.data(graph.links).filter(function (d) {return jQuery.inArray(d.source, selectedNodes)});
	return links;
}




d3.json("network.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg_net.selectAll(".link")
      .data(graph.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg_net.selectAll(".node")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});

var circle = d3.select("#Scatter").selectAll("circle")
    .data([50,60,70,80]);
    
circle.enter().append("circle")
   .attr("cx",function(d,i){return d+(i*d)})
   .attr("cy",function(d,i){return d+(i*d)})
   .attr("r",20);
