console.log('---------------', process.env.BUILDKITE_MESSAGE, process.env.BUILDKITE_BRANCH);
console.log('---------------', 'isMaster', process.env.BUILDKITE_BRANCH === 'master');
console.log('---------------', 'isRelease', process.env.BUILDKITE_BRANCH === 'release');
console.log('---------------', 'isSnapshot', process.env.BUILDKITE_MESSAGE === 'snapshot');
throw new Error('test');
