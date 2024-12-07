const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by pexels.com`,
    images: [
        {
            src: '/images/gallery/img-01.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-02.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-03.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-04.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-05.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-06.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-07.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-08.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-09.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-10.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-11.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-12.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-13.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-14.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export type foodType = {
    title?: string;
    unit: string;
    target: string;
  }

const nutrition = {
    proteins: {
        title: "Proteins",
        data: [
            {
                title: "Fish",
                unit: "Servings (~6–8 oz each)",
                target: "2",
            },
            {
                title: "Poultry",
                unit: "Servings (~4–6 oz each)",
                target: "2",
            },
            {
                title: "Red Meat/Game",
                unit: "Servings (~4–6 oz)",
                target: "1",
            }
        ]
    },
    grains: {
        title: "Whole Grains",
        data: [
            {
                unit: "Cups",
                target: "3",
            }
        ]
    },
    fruits: {
        title: "Fruit",
        data: [
            {
                unit: "Cups",
                target: "5",
            }
        ]
    },
    eggs: {
        title: "Eggs",
        data: [
            {
                unit: "Count",
                target: "6",
            }
        ]
    },
    veggies: {
        title: "Vegetables",
        data: [
            {
                title: "Leafy",
                unit: "Cups",
                target: "6",
            },
            {
                title: "Cruciferous",
                unit: "Cups",
                target: "3",
            },
            {
                title: "Vibrant",
                unit: "Cups",
                target: "5",
            },
            {
                title: "Starchy",
                unit: "Cups",
                target: "3",
            }
        ]
    },
    avocados: {
        title: "Avocados",
        data: [
            {
                unit: "Count",
                target: "2",
            }
        ]
    },
    legumes: {
        title: "Legums",
        data: [
            {
                unit: "Cups",
                target: "3",
            }
        ]
    },
    nuts: {
        title: "Nuts & Seeds",
        data: [
            {
                unit: "Ounces",
                target: "5",
            }
        ]
    },
    chocolate: {
        title: "Dark Chocolate",
        data: [
            {
                unit: "Ounces",
                target: "2",
            }
        ]
    },
    tea: {
        title: "Tea",
        data: [
            {
                unit: "Cups",
                target: "3",
            }
        ]
    },
    fermented: {
        title: "Fermented",
        data: [
            {
                unit: "Servings",
                target: "2",
            }
        ]
    }
}

const defaultCategoryOrder = [
    'Fish',
    'Poultry',
    'Red or Game Meat',
    'Whole Grains',
    'Fruit',
    'Eggs',
    'Leafy',
    'Cruciferous',
    'Vibrant',
    'Starchy',
    'Avocados',
    'Legumes',
    'Nuts & Seeds',
    'Dark Chocolate',
    'Tea',
    'Fermented',
  ];

export { gallery, nutrition, defaultCategoryOrder };