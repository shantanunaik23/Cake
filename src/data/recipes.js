export const recipes = [
  {
    id: 'roast-chicken-tray-bake',
    day: 'Monday',
    name: 'Roast Chicken Tray Bake',
    tagline: 'One sheet pan, two dinners — crispy for you, plain and juicy for them.',
    prepTime: '40 min',
    palette: ['#DC8354', '#EDBE4E'],
    servings: { human: 2, dog: 1 },
    portionSplit: { human: 65, dog: 35 },
    sharedBase: [
      { item: 'Boneless chicken thighs', qty: '900g' },
      { item: 'Carrots, chopped', qty: '3 medium' },
      { item: 'Yukon gold potatoes, cubed', qty: '4 medium' },
      { item: 'Green beans, trimmed', qty: '200g' },
      { item: 'Olive oil (for the human tray only)', qty: '2 tbsp' },
    ],
    humanFork: {
      title: 'Your tray',
      addIns: [
        'Toss vegetables and 2/3 of the chicken in olive oil, smoked paprika, garlic powder, salt & pepper',
        'Roast at 425°F / 220°C for 35–40 min, tossing once',
        'Finish with a squeeze of lemon and chopped parsley',
      ],
    },
    dogFork: {
      title: "Bramble's bowl",
      addIns: [
        'Set aside 1/3 of the chicken and a portion of veg before seasoning anything',
        'Steam or bake plain, no oil, salt, garlic, or onion',
        'Dice small, cool completely, portion per Bramble\'s size (see plan)',
      ],
    },
    safetyNote:
      'The dog portion is pulled aside before any seasoning touches the tray — no garlic powder, onion, added salt, or oil. Chicken, carrot, potato, and green bean are all vet-approved staples in moderation.',
    nutrition: {
      human: {
        perServing: '1 plate (~450g)',
        calories: 620,
        protein: 42,
        carbs: 48,
        fat: 24,
        fiber: 7,
        dailyValue: { calories: 31, protein: 84, carbs: 17, fat: 31, fiber: 25 },
      },
      dog: {
        perServing: '1 bowl (~150g)',
        calories: 210,
        protein: 24,
        fat: 9,
        fiber: 2,
        dailyValue: { calories: 30, protein: 55, fat: 24 },
      },
    },
    benefits: {
      human: ['Muscle-building protein', 'Gut-friendly fiber', 'Heart-healthy fats', 'Post-workout recovery'],
      dog: ['Teeth & gum health', 'Joint support', 'Gentle on digestion', 'Lean muscle maintenance'],
    },
    shoppingList: [
      'Chicken thighs, boneless skinless — 900g',
      'Carrots — 3 medium',
      'Yukon gold potatoes — 4 medium',
      'Green beans — 200g',
      'Olive oil',
      'Smoked paprika',
      'Garlic powder',
      'Lemon',
      'Parsley',
    ],
  },
  {
    id: 'beef-sweet-potato-skillet',
    day: 'Tuesday',
    name: 'Beef & Sweet Potato Skillet',
    tagline: 'A weeknight skillet that forks into a spiced beef bowl and a plain beef-and-sweet-potato dinner.',
    prepTime: '30 min',
    palette: ['#B24A1E', '#729661'],
    servings: { human: 2, dog: 1 },
    portionSplit: { human: 70, dog: 30 },
    sharedBase: [
      { item: 'Lean ground beef', qty: '700g' },
      { item: 'Sweet potato, diced', qty: '2 medium' },
      { item: 'Spinach, chopped', qty: '2 cups' },
      { item: 'Peas', qty: '1 cup' },
    ],
    humanFork: {
      title: 'Your skillet',
      addIns: [
        'Brown 2/3 of the beef with diced onion, cumin, chili powder, and salt',
        'Stir in sweet potato and spinach, simmer 12 min',
        'Top with avocado and a squeeze of lime',
      ],
    },
    dogFork: {
      title: "Bramble's bowl",
      addIns: [
        'Brown the remaining beef plain in a separate pan, no onion or spice',
        'Boil sweet potato and peas separately, mash lightly',
        'Combine, cool, portion per Bramble\'s size',
      ],
    },
    safetyNote:
      'Onion and garlic never touch the dog portion — it\'s browned in its own pan from the start. Peas swapped in for spinach\'s dog-safe partner; both are cooked, unsalted, and cooled before serving.',
    shoppingList: [
      'Ground beef, lean — 700g',
      'Sweet potato — 2 medium',
      'Spinach — 2 cups',
      'Peas — 1 cup',
      'Yellow onion',
      'Cumin',
      'Chili powder',
      'Avocado',
      'Lime',
    ],
  },
  {
    id: 'salmon-rice-bowl',
    day: 'Wednesday',
    name: 'Salmon & Rice Bowl',
    tagline: 'Omega-rich salmon, split into a sesame-glazed bowl and a plain flaked portion.',
    prepTime: '25 min',
    palette: ['#E8A67F', '#DFA52C'],
    servings: { human: 2, dog: 1 },
    portionSplit: { human: 68, dog: 32 },
    sharedBase: [
      { item: 'Skinless salmon fillets', qty: '600g' },
      { item: 'Jasmine rice', qty: '1.5 cups, dry' },
      { item: 'Broccoli florets', qty: '2 cups' },
      { item: 'Carrots, shredded', qty: '1 cup' },
    ],
    humanFork: {
      title: 'Your bowl',
      addIns: [
        'Bake 2/3 of the salmon with soy sauce, sesame oil, and honey glaze',
        'Steam broccoli, serve over rice with shredded carrot and sesame seeds',
        'Finish with sriracha mayo, if you like heat',
      ],
    },
    dogFork: {
      title: "Bramble's bowl",
      addIns: [
        'Bake the remaining salmon plain, no oil, soy, or glaze, until just cooked through',
        'Flake and check carefully for pin bones',
        'Serve with a spoon of plain rice and steamed carrot, cooled',
      ],
    },
    safetyNote:
      'Dog portion salmon is always fully cooked (never raw) with pin bones checked, and gets zero soy sauce or sesame oil — both are portioned and set aside before glazing starts.',
    shoppingList: [
      'Salmon fillets, skinless — 600g',
      'Jasmine rice — 1.5 cups',
      'Broccoli — 2 cups',
      'Carrots — 1 cup',
      'Soy sauce',
      'Sesame oil',
      'Honey',
      'Sesame seeds',
    ],
  },
  {
    id: 'turkey-meatball-marinara',
    day: 'Thursday',
    name: 'Turkey Meatball Marinara',
    tagline: 'One batch of turkey meatballs — half go saucy over pasta, half stay plain in a bowl.',
    prepTime: '35 min',
    palette: ['#C9622F', '#4F7541'],
    servings: { human: 2, dog: 1 },
    portionSplit: { human: 72, dog: 28 },
    sharedBase: [
      { item: 'Ground turkey', qty: '800g' },
      { item: 'Egg', qty: '1' },
      { item: 'Oats, ground', qty: '1/2 cup' },
      { item: 'Zucchini, grated', qty: '1 medium' },
    ],
    humanFork: {
      title: 'Your plate',
      addIns: [
        'Mix 2/3 of the turkey with garlic, basil, oregano, parmesan, salt & pepper',
        'Simmer meatballs in marinara, serve over spaghetti',
        'Top with parmesan and fresh basil',
      ],
    },
    dogFork: {
      title: "Bramble's bowl",
      addIns: [
        'Shape the remaining turkey mix plain, with zucchini and oats only — no garlic, onion, or cheese',
        'Bake at 375°F / 190°C until cooked through, no sauce',
        'Cool and portion; great for freezing extra',
      ],
    },
    safetyNote:
      'Garlic, onion, and parmesan are strictly a human-plate ingredient — the dog batch is mixed and shaped before any seasoning is added, so cross-contact never happens.',
    shoppingList: [
      'Ground turkey — 800g',
      'Egg — 1',
      'Rolled oats — 1/2 cup',
      'Zucchini — 1 medium',
      'Garlic',
      'Dried basil & oregano',
      'Parmesan',
      'Marinara sauce',
      'Spaghetti',
    ],
  },
  {
    id: 'pumpkin-turkey-chili',
    day: 'Friday',
    name: 'Pumpkin Turkey Chili',
    tagline: 'Cozy chili for you, a mellow pumpkin-turkey stew for them.',
    prepTime: '45 min',
    palette: ['#DFA52C', '#8F3A17'],
    servings: { human: 2, dog: 1 },
    portionSplit: { human: 66, dog: 34 },
    sharedBase: [
      { item: 'Ground turkey', qty: '700g' },
      { item: 'Pumpkin purée (plain)', qty: '2 cups' },
      { item: 'Black beans (human portion only)', qty: '1 can' },
      { item: 'Bell pepper, diced', qty: '1' },
    ],
    humanFork: {
      title: 'Your bowl',
      addIns: [
        'Brown 2/3 of the turkey with onion, bell pepper, chili powder, cumin, and smoked paprika',
        'Stir in beans, pumpkin, and diced tomatoes, simmer 25 min',
        'Top with cheddar, sour cream, scallions',
      ],
    },
    dogFork: {
      title: "Bramble's bowl",
      addIns: [
        'Brown remaining turkey plain, no onion or spice',
        'Stir in plain pumpkin purée only — no beans, no tomato, no chili spices',
        'Cool fully before serving; pumpkin helps with digestion',
      ],
    },
    safetyNote:
      'Beans, tomato, onion, and chili spices stay entirely on the human side. Plain pumpkin purée (not pie filling) is a vet-recommended gut-friendly staple for the dog portion.',
    shoppingList: [
      'Ground turkey — 700g',
      'Pumpkin purée, plain — 2 cups',
      'Black beans — 1 can',
      'Bell pepper — 1',
      'Yellow onion',
      'Diced tomatoes — 1 can',
      'Chili powder, cumin, smoked paprika',
      'Cheddar cheese',
      'Sour cream',
    ],
  },
]

export function getRecipeById(id) {
  return recipes.find((r) => r.id === id)
}
