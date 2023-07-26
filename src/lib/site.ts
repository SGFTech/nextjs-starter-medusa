import { Routes } from "./routes";


export const siteSettings = {
    name: "Source Good Food",
    description: "",
    
    Banner:[{
        id: "banner-1",
        type_id: "bakery",
        title: 'Get Your Ingredients Delivered',
        description:
          'Get your favorite ingredients delivered to your doorsteps at any time',
        image: {
          id: '' + 908,
          original:
            'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/bakery.jpg',
          thumbnail:
            'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/bakery-thumbnail.jpg',
          created_at: '2021-07-17T13:22:34.000000Z',
          updated_at: '2021-07-17T13:22:34.000000Z',
        },
      }],
    
    logo: {
        url: "/logo.png",
        alt: "Source Good Food",
        href: "/",
        width: 1024,
        height: 1024
    },
    defaultLanguage: "en",
    currencyCode: "INR",
    product: {
        placeholderImage: "/product-placeholder.svg",
        cardMaps: {
            grocery: "Krypton",
            furniture: "Radon",
            bag: "Oganesson",
            makeup: "Neon",
            book: "Xenon",
            medicine: "Helium",
            default: "Xenon"
        }
    },
    authorizedLinks: [
        { href: Routes.profile, label: "auth-menu-profile" },
        { href: Routes.orders, label: "auth-menu-my-orders" },
        { href: Routes.wishlists, label: "profile-sidebar-my-wishlist" },
        { href: Routes.checkout, label: "auth-menu-checkout" }
    ],
    authorizedLinksMobile: [
        { href: Routes.profile, label: "auth-menu-profile" },
        { href: Routes.orders, label: "auth-menu-my-orders" },
        { href: Routes.cards, label: "profile-sidebar-my-cards" },
        { href: Routes.wishlists, label: "profile-sidebar-my-wishlist" },
        { href: Routes.questions, label: "profile-sidebar-my-questions" },
        { href: Routes.refunds, label: "text-my-refunds" },
        { href: Routes.reports, label: "profile-sidebar-my-reports" },
        { href: Routes.checkout, label: "auth-menu-checkout" },
        { href: Routes.changePassword, label: "profile-sidebar-password" }
    ],
    dashboardSidebarMenu: [
        {
            href: Routes.profile,
            label: "profile-sidebar-profile"
        },
        {
            href: Routes.changePassword,
            label: "profile-sidebar-password"
        },
        {
            href: Routes.orders,
            label: "profile-sidebar-orders"
        },
        {
            href: Routes.downloads,
            label: "profile-sidebar-downloads"
        },
        {
            href: Routes.wishlists,
            label: "profile-sidebar-my-wishlist"
        },
        {
            href: Routes.questions,
            label: "profile-sidebar-my-questions"
        },
        {
            href: Routes.refunds,
            label: "text-my-refunds"
        },
        {
            href: Routes.reports,
            label: "profile-sidebar-my-reports"
        },
        {
            href: Routes.cards,
            label: "profile-sidebar-my-cards",
            // MultiPayment: Make it dynamic or from mapper
            cardsPayment: ["STRIPE"]
        },
        {
            href: Routes.help,
            label: "profile-sidebar-help"
        },
        {
            href: Routes.logout,
            label: "profile-sidebar-logout"
        }
    ],
    sellingAdvertisement: {
        image: {
            src: "/selling.png",
            alt: "Selling Advertisement"
        }
    },
    cta: {
        mockup_img_src: "/mockup-img.png",
        play_store_link: "/",
        app_store_link: "/"
    },
    footer: {
        copyright: {
            name: "Source Good Food Tech Pvt Ltd",
            href: "https://redq.io/"
        },
        address:
            "108 summit business bay andheri east mumbai",
        email: "customer.support@sourcegoodfood.com",
        phone: "+91 6364534849",
        menus: [
            {
                title: "text-explore",
                links: [
                    {
                        name: "text-about-us",
                        href: "/"
                    },
                    {
                        name: "text-sitemap",
                        href: "/"
                    },
                    {
                        name: "text-bookmarks",
                        href: "/"
                    },
                    {
                        name: "text-sign-join",
                        href: "/"
                    }
                ]
            },
            {
                title: "text-customer-service",
                links: [
                    {
                        name: "text-faq-help",
                        href: Routes.help
                    },
                    {
                        name: "text-returns",
                        href: "/"
                    },
                    /*{
                        name: "text-accessibility",
                        href: "/"
                    },*/
                    {
                        name: "text-contact-us",
                        href: Routes.contactUs
                    },
                    /*{
                        name: "text-store-pickup",
                        href: "/"
                    }*/
                ]
            },
            {
                title: "text-our-information",
                links: [
                    {
                        name: "text-privacy-update",
                        href: Routes.privacy
                    },
                    {
                        name: "text-terms-condition",
                        href: Routes.terms
                    },
                    {
                        name: "text-return-policy",
                        href: "/"
                    },
                    /*{
                        name: "text-sitemap",
                        href: "/"
                    }*/
                ]
            }
        ],
        payment_methods: [
            {
                img: "/payment/master.png",
                url: "/"
            },
            {
                img: "/payment/skrill.png",
                url: "/"
            },
            {
                img: "/payment/paypal.png",
                url: "/"
            },
            {
                img: "/payment/visa.png",
                url: "/"
            },
            {
                img: "/payment/discover.png",
                url: "/"
            }
        ]
    }
};
