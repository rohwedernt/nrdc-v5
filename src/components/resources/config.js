const baseURL = 'naterohweder.com'

// default customization applied to the HTML in the main layout.tsx
const style = {
    theme:       'dark',        // dark | light
    neutral:     'gray',        // sand | gray | slate
    brand:       'blue',        // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    accent:      'emerald',      // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    solid:       'color',       // color | contrast
    solidStyle:  'flat',        // flat | plastic
    border:      'playful',     // rounded | playful | conservative
    surface:     'translucent', // filled | translucent
    transition:  'all',         // all | micro | macro
    scaling:     '100',         // 90 | 95 | 100 | 105 | 110
}

// default metadata
const meta = {
    title: 'Nate Rohweder',
    description: ''
}


// default open graph data
const og = {
    title: 'Nate Rohweder Dot Com',
    description: '',
    type: 'website'
}

// default schema data
const schema = {
    logo: '',
    type: 'Personal',
    name: 'Nate Rohweder Dot Com',
    description: '',
    email: 'rohwedernt@gmail.com'
}

// social links
const social = {
    github: 'https://github.com/rohwedernt',
    linkedin: 'https://www.linkedin.com/in/naterohweder/',
    email: 'mailto:rohwedernt@gmail.com'
}

export { baseURL, style, meta, og, schema, social };