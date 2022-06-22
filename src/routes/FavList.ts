import { Router } from 'express';
import { create, list, destroy } from '../controllers/FavList.controller';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    ListItem:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of item
 *        title:
 *          type: string
 *          description: title of item of list
 *        description:
 *          type: string
 *          description: Description of fav item
 *        link:
 *          type: string
 *          description: optional link
 *      required:
 *        - title
 *      example:
 *        id: 62b24988ea3ba9d820a7375f
 *        title: Apple pie
 *        description: Mon pie
 *        link: http://google.com
 *    FavList:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of fav list
 *          example: 62b24988ea3ba9d820a7375f
 *        name:
 *          type: string
 *          description: name of list
 *          example: Foods
 *        items:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ListItem'
 *      required:
 *        - name
 *        - items
 *    NewFavList:
 *      type: object
 *      properties:
 *        listName:
 *          type: string
 *          example: Food
 *        items:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ListItem'
 *  parameters:
 *    Authorization:
 *      in: header
 *      name: Authorization
 *      required: true
 *      schema:
 *        type: string
 *        example: Beare token
 *      description: Auth token
 *    ListId:
 *      in: path
 *      name: favListId
 *      required: true
 *      schema:
 *        type: string
 *        example: 62b24988ea3ba9d820a7375f
 *      description: Id of fav list
 */

/**
 * @swagger
 * tags:
 *  name: Favs
 *  description: Fav end point
 */

/**
 * @swagger
 * /api/favs:
 *  get:
 *    summary: Returns a list of favs
 *    tags: [Favs]
 *    parameters:
 *      - $ref: '#/components/parameters/Authorization'
 *    responses:
 *      200:
 *        description: the list of favs
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                favList:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/FavList'
 */
router.route('/').get(list);

/**
 * @swagger
 * /api/favs:
 *  post:
 *    summary: Create new fav list.
 *    tags: [Favs]
 *    parameters:
 *      - $ref: '#/components/parameters/Authorization'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewFavList'
 *    responses:
 *      200:
 *        description: the list of favs
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: bool
 *                  example: true
 *                message:
 *                  type: string
 *                  example: list was create
 *                favList:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/FavList'
 */
router.route('/').post(create);

/**
 * @swagger
 * /api/favs/:favLisId:
 *  delete:
 *    summary: Create new fav list.
 *    tags: [Favs]
 *    parameters:
 *      - $ref: '#/components/parameters/Authorization'
 *      - $ref: '#/components/parameters/ListId'
 *    responses:
 *      200:
 *        description: the list of favs
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: bool
 *                  example: true
 *                message:
 *                  type: string
 *                  example: list was deleted.
 *                favList:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/FavList'
 */
router.route('/:favListId').delete(destroy);

export default router;
