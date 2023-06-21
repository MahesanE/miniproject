package sg.edu.nus.iss.miniproject.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class StripeService {

    @Value("${stripe.secretKey}")
    private String stripeSecretKey;

    public Session createSession(List<SessionCreateParams.LineItem> lineItems) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .addAllLineItem(lineItems)
                .setSuccessUrl("https://good-meeting-production.up.railway.app/payment-success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("https://good-meeting-production.up.railway.app/cart") // Replace with your cancel URL
                .build();

        return Session.create(params);
    }

    public Session getSession(String sessionId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        return Session.retrieve(sessionId);
    }
    
}
