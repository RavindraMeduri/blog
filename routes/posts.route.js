const router = require('express').Router();
const authMiddleware = require('../middlewares/authen.middleware');


router.use(authMiddleware);

router.get('/', (req, res) => {
    res.render('pages/posts');
});

module.exports = router;