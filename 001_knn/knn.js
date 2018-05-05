
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

KNN.prototype.train = function(data) {
	this.points = this.points.concat(data);
}

KNN.prototype.score = function(testingData) {
	const vectors = testingData.map(data => data[0]);
	const predictedClasses = this.predict(vectors);
	let score = 0;
	testingData.forEach((data, index) => {
		if (data[1] === predictedClasses[index]) score++;
	})

	return score / testingData.length;
}

KNN.prototype.predict = function(vectors) {
	return vectors.map(v => this.predictSingle(v));
}

KNN.prototype.predictSingle = function(vector) {
	const distances = this._distances(vector, this.points)
	const sortedDistances = this._sorted(distances);
	return this._majority(this.kSize, sortedDistances);
}

KNN.prototype._distance = function(v1, v2) {
	let sum = 0;
	for (let i = 0; i < v2.length; i++) {
		sum += (Math.pow(v2[i] - v1[i], 2));
	}
	return Math.sqrt(sum);
}

KNN.prototype._distances = function(vector, data) {
	let result = [];

	data.forEach(([v, c]) => {
		result.push([this._distance(vector, v), c]);
	});

	return result;
}

KNN.prototype._sorted = function(distances) {
	return distances.slice().sort((a, b) => {
		return a[0] - b[0];
	}).map(e => e[1]);
}

KNN.prototype._majority = function(k, sortedData) {
	const classes = {};
	let max = 0, maxClass = 0;

	for (let i = 0; i < k; i++) {
		classes[sortedData[i]] = classes[sortedData[i]] + 1 || 1;
	}

	for (let key in classes) {
		if (classes.hasOwnProperty(key)) {
			if (classes[key] > max) {
				max = classes[key];
				maxClass = Number(key);
			}
		}
	}

	return maxClass;
}

module.exports = KNN
