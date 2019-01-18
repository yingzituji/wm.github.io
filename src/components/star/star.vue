<template>
   <!-- <div class="star-box">
        <span class="star" v-for='(item,index) in starGroup' :class='item'></span>
    </div> -->
    
    <div class="star-box" :class="starType">
        <span class="star" v-for='itemClass in itemClasses' :class='itemClass'></span>
    </div>
    
</template>
<script>
/*function matchScore(score) {
  let len = parseInt(score),
    floor = parseFloat(score) - len,
    countStar = 5,
    group = [];
  for (var i = 0; i < len; i++) {
    group.push("on");
  }
  if (floor > 0) {
    group.push("half");
  }
  let residue = countStar - group.length;
  if (residue > 0) {
    for (var j = 0; j < residue; j++) {
      group.push("off");
    }
  }
  return group;
}*/

/*cyt 1204*/
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  /*props: {
    score: 0
  },*/
  
  props: {
  	size: {
  		type: Number
  	},
  	score: {
  		type: Number
  	}
  },
  computed: {
  	starType() {
  		return 'star-' + this.size;
  	},
  	itemClasses() {
  		let result = [];
  		let score = Math.floor(this.score*2) / 2;
  		let hasDecimal = score %1 !== 0;
  		let integer = Math.floor(score);
  		for (let i = 0; i < integer; i++) {
  			result.push(CLS_ON);
  		}
  		if (hasDecimal) {
  			result.push(CLS_HALF);
  		}
  		while (result.length < LENGTH) {
  			result.push(CLS_OFF);
  		}
  		return result;
  	}
  }
  
  /*data() {
    return {
      starGroup: []
    };
  },
  methods: {},
  watch: {
    score: function(newScore) {
      this.starGroup = matchScore(newScore);
    }
  },
  created() {
    this.starGroup = matchScore(this.score);
  }*/
};
</script>
<style>
.star-box {
  display: inline;
  vertical-align: sub;
  font-size: 0;
}
.star-48 .star:nth-child(1),
.star-36 .star:nth-child(1),
.star-24 .star:nth-child(1) {
  margin-left: 0px;
}
/*.star {
  margin-left: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}*/

.star {
  margin-left: 10px;
  display: inline-block;
}

.star-48 .star{
	width: 20px;
	height: 20px;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	margin-left: 14px;
}
.star-48 .on {
	background-image: url("./star48_on@2x.png");
}
.star-48 .half {
	background-image: url("./star48_half@2x.png");
}
.star-48 .off {
	background-image: url("./star48_off@2x.png");
}
.star-36 .star{
	width: 15px;
	height: 15px;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	margin-left: 10px;
}
.star-36 .on {
	background-image: url("./star36_on@2x.png");
}
.star-36 .half {
	background-image: url("./star36_half@2x.png");
}
.star-36 .off {
	background-image: url("./star36_off@2x.png");
}
.star-24 .star{
	width: 10px;
	height: 10px;
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.star-24 .on {
	background-image: url("./star24_on@2x.png");
}
.star-24 .half {
	background-image: url("./star24_half@2x.png");
}
.star-24 .off {
	background-image: url("./star24_off@2x.png");
}

/*.star-box {
	&.star-48 {
		.star{
			width: 20px;
	  		height: 20px;
	  		background-repeat: no-repeat;
	  		background-size: 100% 100%;
			&.on {
				background-image: url("./star48_on@2x.png");
			}
			&.half {
				background-image: url("./star48_half@2x.png");
			}
			&.off {
				background-image: url("./star48_off@2x.png");
			}
		}
	}
	&.star-36 {
		.star{
			width: 15px;
	  		height: 15px;
	  		background-repeat: no-repeat;
	  		background-size: 100% 100%;
			&.on {
				background-image: url("./star36_on@2x.png");
			}
			&.half {
				background-image: url("./star36_half@2x.png");
			}
			&.off {
				background-image: url("./star36_off@2x.png");
			}
		}
	}
	&.star-24 {
		.star{
			width: 10px;
	  		height: 10px;
	  		background-repeat: no-repeat;
	  		background-size: 100% 100%;
			&.on {
				background-image: url("./star24_on@2x.png");
			}
			&.half {
				background-image: url("./star24_half@2x.png");
			}
			&.off {
				background-image: url("./star24_off@2x.png");
			}
		}
	}
	
}*/
/*.on {
  background-image: url("./star24_on@2x.png");
}

.half {
  background-image: url("./star24_half@2x.png");
}

.off {
  background-image: url("./star24_off@2x.png");
}*/
</style>
