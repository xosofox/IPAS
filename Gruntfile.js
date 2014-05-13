module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: {
                    "js/ipas.min.js": ['js/views/*.js', 'js/models/*.js'],
                }
            }
        },
        replace: {
            version: {
                src: ['index.html'],
                dest: 'index.html',
                replacements: [
                    {
                        from: /\?v=\d+\.\d+\.\d+/g,
                        to: "?v=<%= pkg.version %>"
                    },
                    {
                        from: /V \d+\.\d+\.\d+ - Resistance/g,
                        to: "V <%= pkg.version %> - Resistance"
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'replace']);
};
