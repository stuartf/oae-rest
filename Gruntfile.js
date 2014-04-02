module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-release');

    grunt.initConfig({
        'release': {
            'options': {
                'github': {
                    'repo': 'oaeproject/oae-rest',
                    'usernameVar': 'GITHUB_USERNAME',
                    'passwordVar': 'GITHUB_PASSWORD'
                }
            }
        }
    });

    grunt.registerTask('default', 'mochaTest');
};