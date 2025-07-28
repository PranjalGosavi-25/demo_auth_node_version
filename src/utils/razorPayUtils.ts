export class RazorPayUtils {
  static loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  static async displayRazorpay(payload: {
    subscriptionId: string;
    setLoading: (loading: boolean) => void;
    handleVerifyPayment: (response: {
      razorpay_payment_id: string;
      razorpay_subscription_id: string;
      razorpay_signature: string;
    }) => void;
  }) {
    const { subscriptionId, setLoading, handleVerifyPayment } = payload;

    const res = await this.loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razropay failed to load!!');
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      // amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      // currency: 'USD',
      name: 'Newtral.io',
      description: 'Carbon Emission Management Software',
      image: 'https://platform.dev.newtral.io/images/newtral-logo-sm.svg',
      // order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      subscription_id: subscriptionId,
      handler: handleVerifyPayment,
      //   notes: {
      //     address: 'Razorpay Corporate Office'
      //   },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
        confirm_close: true
      }
    };
    // @ts-ignore
    const paymentObject = new window.Razorpay(options);

    paymentObject.on('payment.failed', function (response: any) {
      setLoading(false);
    });
    paymentObject.open();
  }
}
