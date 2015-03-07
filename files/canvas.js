
function Canvas(fthis,id){
	var that = this;
	
	this.elem = $(id);
	this.ctx = this.elem.getContext('2d');
	
	this.width = this.elem.width;
	this.height = this.elem.height;
	
	this.half_width = this.width/2;
	this.half_height = this.height/2;
	
	this.clear = function(){
		this.ctx.clearRect(0,0,this.width,this.height);
	};
	
	this.blur = function(msg){
		/*
		var bar_h = this.height/3,
			bar_w = this.width/12,
			bar_s = bar_w/3;
		msg = msg || "mouse over to begin";
		this.ctx.save();
			this.ctx.fillStyle = "rgba(0,0,0,0.05)";
			this.ctx.fillRect(0,0,this.width,this.height);
			
			//draw a bar behind the message.
			this.ctx.fillStyle = "rgba(255,255,255,0.90)";
			this.ctx.fillRect(0,(this.height/2)-13,this.width,26);
		
			// draw some text at the top:
			this.ctx.fillStyle = "rgba(0,0,0,0.6)";
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.font = "bold 14px sans-serif";
			this.ctx.fillText(msg,this.width/2,this.height/2);
		
		this.ctx.restore();
		*/
	};
	
	//be sure to remove any old events...
	this.elem.removeEvents();
	
	//then reset the events so that the proper update function is called.
	this.elem.addEvents({
		'mousemove': function(e){
			var elem_loc = this.getPosition();
			fthis.update({
				x: e.page.x - elem_loc.x,
				y: e.page.y - elem_loc.y
			});
		},
		'mouseout':function(e){
			// set the canvas to display message about being paused.
			//that.blur();
		}
	});
	
	//common image
	this.img = new Image();
  	this.img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQ1JREFUeNrsnb1PVEEQwPcORFBR8AAV5UPgIDFaaeEfYGNjYWKnpUattDHxH7C2sFArE/4EjY2JjUYTQ2WhMcehIJFgDB9iAMHjnM09DDnv6+3MvJt9N5NMIcmus++3szNvdt9eIp/PGxU5klAgCkRFgSgQFQWiQFQUiAJRaQAgSdAroJ2O7TdBx0F/MtjWDnoZdLdje2vTE9Atn4CcB32O7OMC6FMG2+6C3kP20Q/6FTNbo5Yxgj5mhNr2B3QOu3xELcMEfWSF2jYdQPEKyAiy/TzoL6G2TVIEWN+AZJjs2gt6uN62RQ2kGXQQ2ceU0IlCYlvUQPoCKHVdFhhjm3dLFsUszAoGkvUNSJqgj4xQ2/I+AolzyjsL+rvRlqwl0AWhtpFMlKiBDAkN6C2gxyTYFiWQhIQXrwoTJdloQHpBW4UCocj+vAOiKa8C8c+2KIEMSVkWGGyzBc8V34CMItuvGuReA6NtZJ7rk4dweUcT6IAU22ot9NkM6VKQurrKCYK0+RYDkBToLmQfPQjbLMxn/wZZ4576Y9CrRoVDpnZmebUuWWP63NhkxiWGjOhzY5PJsEDaghiiwiPZsEDUO3glExbIkD4z9qCuHuJzDBnWZ8Ym301RyaUWIGl9btF4hy5ZHgKxJYU+fW7RBPRagAyaQvFNRYiHaEDnlY/Ff6hWXLRfOd00uGrobdD9SLceZ3gYtgJxB9nHG9AXjm3t3o4t2ubDAKEY9Cqyj0eg1xlsOwv6FtnHDdCHlEZxb1BRvOVzHR0dlmgbNxARR/x9so0biIgj/ky22a+Bqb51bFIgeNs+g+aIbGmJCgi27PINdE2obZQTZcMXD+HyDntBQLcg23JRALHvLtjjNQ0V0LmBDBh82SXW3xNGDWRE6qCJbMsoEDm22ctlvvgGJM4p78zOzKhRPMR+S7gs1DauZIMVCLaOxVXDsndhHRVi239npZsrGJ0y7oerkwQvXnMED66UjBrcoXErPxxsywexZ7nSy245IBdBTyMM3m/wJ8oPmcJeisTYdiqkbVtBzLEg35nCPkqoJasHafABgkEvMS1ZHQR9LDq02d54Wq20ZJUD0oU0uJNg0MuCgbjYlgigrJWAVBFIW6D19pAFoUDs5WmbjsHbPu/1sFlWF8GgsR6yafiqvJ118I58oDlTZUu7FJAUwaCxHrLIBCNpcAcuMLHNAmlyAdLt6SysNftL1AlIwnXJwnrIHoKUl8tDKAL6kqN3bMefXNignqqzd8Qx5d3OsKomKhxBvSPmQFyX02QtbZMl/t2uL4VlZb1aDKiS9oYG0ipg0HaNXREKBDNRErW0LwbSIiDD4vIOCiDYZKNqDCk+22sBHUf+pxPIgb8EvcYA4wjoK2QfD0DvO7a1xcXZUpnVTimu9tqqZBbpHdhZ+N7w3IvVT9DHhOG7s6tsloWRON+JxWkbG5C04EGnGxFInA822Lfsed+AYA8P2JR3mmmsIi5K9s1D0L9Qo0BogXAtV7aCvQ/ZR8Y3IPYXanqFAhkl6MM7D9GUVxgQvShZGJA4/zbIdtmj4TxE6ml3O1G2Gg0IyS/UML2lR7JcSVuyuLzDbpgd9CGgUwKx+yjYaqrk7wm985BBgr4kX6HhnYdolVcYkDinvJwFTzYg2F8422BcsrC2fTLhD1c7C9V9WfZronPG/ZjmB1P4kIVDToKeQbR/HeWSxX2BmYoCUSAqCkSBqCgQBaIiQP4KMABODzgFTQcJswAAAABJRU5ErkJggg==';

};
