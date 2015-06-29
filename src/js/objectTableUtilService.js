angular.module('objectTable').service('objectTableUtilService', [function () {
		//extend Array [+swap]
		Array.prototype.swap = function (new_index,old_index) {
			
			if (new_index >= this.length) {
				var k = new_index - this.length;
				while ((k--) + 1) {
					this.push(undefined);
				}
			}
			this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
return {
	getArrayFromParams : function (string,attrName){
		if(!string) throw "Required '" + attrName + "' attribute is not found!";
		var tempArray=[];
		var preArray = string.split(',');
		for (var i = 0,length=preArray.length; i <length; i++) {
			tempArray.push( preArray[i].trim() );
		}
		return tempArray;
	}
};

}]);