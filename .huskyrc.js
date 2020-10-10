module.exports = {
    'hooks': {
        'pre-commit': tasks([
            'lint-staged'
        ]),
        'pre-push': tasks([
            'npm run test:ci'
        ])
    }
}