import { Router, Request, Response } from "express";
import Validators from "../../tools/validators";
import ContactForm from "../../types/dto/contact/ContactForm";
import ContactFormController from "../../controllers/contact";

const router = Router();
const controller = new ContactFormController();

const handler = (req: Request, res: Response) => {
  res.json({
    status: "Route is live",
    url: req.url,
  });
};
router
  .route("/contact")
  .get(handler)
  .post([
    Validators.validateInput(ContactForm),
    controller.sendContactFormSubmission,
  ]);

export default router;
