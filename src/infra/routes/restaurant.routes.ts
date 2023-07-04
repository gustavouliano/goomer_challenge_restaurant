import { Router } from "express";
import RestaurantController from "../../application/controllers/RestaurantController";
import passport from "passport";
import uploads from "../provider/MulterUploadProvider";

const restaurantController = new RestaurantController();
const router = Router();

// passport.use(new GooglePlusTokenStrategy({
//     clientID: '940328766399-mln96dineagm48tkqbttlihrk8m9gl1m.apps.googleusercontent.com',
//     clientSecret: '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',
//     passReqToCallback: true
// }, function(req: Request, accessToken: any, refreshToken: any, profile: any, done: any) {
//     console.log('a');
//     const user = {
//         email: profile.emails[0].value,
//         username: profile.displayName
//     }
//     return done(null, user);
// }));

// router.post('/', passport.authenticate('google-plus-token', { session: false }, function(err:any, user: any, info: any, status: any) {
//     if (err) {
//         // ocorreu erro
//     }
// }), restaurantController.create);

router.post('/', /*passport.authenticate('google-plus-token', { session: false }),*/ uploads.single('image'), restaurantController.create)
router.get('/', restaurantController.listRestaurant);
router.get('/:id', restaurantController.findRestaurant);
router.put('/:id', passport.authenticate('google-plus-token', { session: false }), restaurantController.updateRestaurant);
router.delete('/:id', passport.authenticate('google-plus-token', { session: false }), restaurantController.deleteRestaurant);

export default router;