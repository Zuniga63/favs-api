import { Router } from 'express';
import signUp, { signIn } from '../controllers/User.controller';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    NewUser:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the name of the user
 *        email:
 *          type: string
 *          description: the email of new user
 *        password:
 *          type: string
 *          description: the password of user
 *      required:
 *        - name
 *        - email
 *        - password
 *      example:
 *        name: John Doe
 *        email: john@email.com
 *        password: Clave123*
 *    LoginUser:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: the email of new user
 *        password:
 *          type: string
 *          description: the password of user
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: john@email.com
 *        password: Clave123*
 *    AuthResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          description: JWT token for auth
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI...
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: AUTH endpoint
 */

/**
 * @swagger
 * /auth/local/signup:
 *  post:
 *    summary: Register a new user and return token
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewUser'
 *    responses:
 *      201:
 *        description: the token for auth
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthResponse'
 */
router.route('/signup').post(signUp);

/**
 * @swagger
 * /auth/local/login:
 *  post:
 *    summary: Login the user and return token
 *    tags: [Auth]
 *    requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginUser'
 *    responses:
 *      200:
 *        description: the token for auth
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthResponse'
 */
router.route('/login').post(signIn);

export default router;
