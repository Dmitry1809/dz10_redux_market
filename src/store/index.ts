import { legacy_createStore as createStore, combineReducers } from 'redux';
import type { UnknownAction } from 'redux';
import { nanoid } from 'nanoid';

// --- ИНТЕРФЕЙСЫ И СТРУКТУРА ДАННЫХ ---
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  available: boolean;
  imageUrl?: string;
  description: string;
  features: string[];
  isNew?: boolean;
  hasDiscount?: boolean;
}

// 1. Создаем чистый интерфейс для состояния формы (БЕЗ ANY!)
export interface FormState {
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  brand: string;
  rating: number;
  reviewsCount: string;
  available: boolean;
  description: string;
  features: string[];
  isSubmitting: boolean;
  errors: Record<string, string>;
}

const CATEGORIES = [
  'Смартфоны', 'Ноутбуки', 'Планшеты', 'Наушники',
  'Умные часы', 'Фотоаппараты', 'Телевизоры', 'Игровые приставки'
];

// Демонстрационные данные для каталога
const initialProducts: Product[] = [
  {
    id: nanoid(),
    name: "iPhone 15 Pro 128GB",
    price: 99990,
    originalPrice: 119990,
    category: "Смартфоны",
    brand: "Apple",
    rating: 4.8,
    reviewsCount: 1247,
    available: true,
    description: "Смартфон с тройной камерой и процессором A17 Pro",
    features: ["128GB", "Titanium", "5G", "Face ID"],
    isNew: true,
    hasDiscount: true
  },
  {
    id: nanoid(),
    name: "Игровая приставка PlayStation 5 Slim",
    price: 54990,
    category: "Игровые приставки",
    brand: "Sony",
    rating: 4.9,
    reviewsCount: 412,
    available: true,
    description: "Обновленная более тонкая версия легендарной консоли",
    features: ["825GB", "4K HDR", "White"],
    isNew: false,
    hasDiscount: false
  },
  {
    id: nanoid(),
    name: "Наушники Sony WH-1000XM4",
    price: 28990,
    originalPrice: 34990,
    category: "Наушники",
    brand: "Sony",
    rating: 4.7,
    reviewsCount: 853,
    available: false,
    description: "Полноразмерные беспроводные наушники с активным шумоподавлением",
    features: ["ANC", "30h Battery", "Hi-Res Audio"],
    isNew: false,
    hasDiscount: true
  }
];

// --- ACTION TYPES ---
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_SORT = 'SET_SORT';
export const SET_FORM_FIELD = 'SET_FORM_FIELD';
export const ADD_FEATURE = 'ADD_FEATURE';
export const REMOVE_FEATURE = 'REMOVE_FEATURE';
export const VALIDATE_FORM = 'VALIDATE_FORM';
export const CLEAR_FORM = 'CLEAR_FORM';
export const SET_SUBMITTING = 'SET_SUBMITTING';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

// --- ACTION CREATORS ---
export const addProduct = (product: Product) => ({ type: ADD_PRODUCT, payload: product });
export const setSort = (sortBy: 'name' | 'price' | 'rating', sortOrder: 'asc' | 'desc') => ({ type: SET_SORT, payload: { sortBy, sortOrder } });
export const setFormField = (field: string, value: unknown) => ({ type: SET_FORM_FIELD, payload: { field, value } });
export const addFeature = (feature: string) => ({ type: ADD_FEATURE, payload: feature });
export const removeFeature = (index: number) => ({ type: REMOVE_FEATURE, payload: index });
export const validateForm = () => ({ type: VALIDATE_FORM });
export const clearForm = () => ({ type: CLEAR_FORM });
export const setSubmitting = (isSubmitting: boolean) => ({ type: SET_SUBMITTING, payload: isSubmitting });
export const showNotification = (message: string) => ({ type: SHOW_NOTIFICATION, payload: message });
export const clearNotification = () => ({ type: CLEAR_NOTIFICATION });

// --- УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ВАЛИДАЦИИ ФОРМЫ ---
// 2. Жестко типизируем аргумент через интерфейс FormState
export const validateProductForm = (formState: FormState): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!formState.name || formState.name.trim().length < 3) errors.name = 'Название должно быть минимум 3 символа';
  
  const priceNum = Number(formState.price);
  if (!formState.price || isNaN(priceNum) || priceNum <= 0) errors.price = 'Цена должна быть числом больше 0';
  
  if (formState.originalPrice) {
    const origPriceNum = Number(formState.originalPrice);
    if (isNaN(origPriceNum) || origPriceNum <= priceNum) {
      errors.originalPrice = 'Первоначальная цена должна быть больше текущей';
    }
  }
  
  if (!formState.brand || formState.brand.trim().length < 2) errors.brand = 'Бренд должен быть минимум 2 символа';
  if (formState.rating < 1 || formState.rating > 5) errors.rating = 'Рейтинг должен быть от 1 до 5';
  if (!formState.description || formState.description.trim().length < 10) errors.description = 'Описание должно быть минимум 10 символов';
  
  return errors;
};

// --- REDUCERS ---

const productsReducer = (state = { items: initialProducts, categories: CATEGORIES }, action: UnknownAction) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, items: [action.payload as Product, ...state.items] };
    default:
      return state;
  }
};

// 3. Указываем начальное состояние формы строго через наш интерфейс
const initialFormState: FormState = {
  name: '', 
  price: '', 
  originalPrice: '', 
  category: CATEGORIES[0], // сразу ставим первую категорию по умолчанию
  brand: '', 
  rating: 5, 
  reviewsCount: '0', 
  available: true,
  description: '', 
  features: [],
  isSubmitting: false, 
  errors: {}
};

const formReducer = (state = initialFormState, action: UnknownAction) => {
  switch (action.type) {
    case SET_FORM_FIELD: {
      const payload = action.payload as { field: string; value: unknown };
      return { ...state, [payload.field]: payload.value };
    }
    case ADD_FEATURE:
      return { ...state, features: [...state.features, action.payload as string] };
    case REMOVE_FEATURE:
      return { ...state, features: state.features.filter((_, i) => i !== (action.payload as number)) };
    case VALIDATE_FORM:
      return { ...state, errors: validateProductForm(state) };
    case SET_SUBMITTING:
      return { ...state, isSubmitting: action.payload as boolean };
    case CLEAR_FORM:
      return initialFormState;
    default:
      return state;
  }
};

const initialUiState = { 
  sortBy: 'name' as 'name' | 'price' | 'rating', 
  sortOrder: 'asc' as 'asc' | 'desc', 
  notification: null as string | null 
};

const uiReducer = (state = initialUiState, action: UnknownAction) => {
  switch (action.type) {
    case SET_SORT: {
      const payload = action.payload as { sortBy: 'name' | 'price' | 'rating'; sortOrder: 'asc' | 'desc' };
      return { ...state, sortBy: payload.sortBy, sortOrder: payload.sortOrder };
    }
    case SHOW_NOTIFICATION:
      return { ...state, notification: action.payload as string };
    case CLEAR_NOTIFICATION:
      return { ...state, notification: null };
    default:
      return state;
  }
};

// --- СОРТИРОВАННЫЙ СПИСОК ТОВАРОВ (СЕЛЕКТОР) ---
export const selectSortedProducts = (state: RootState) => {
  const { items } = state.products;
  const { sortBy, sortOrder } = state.ui;
  
  return [...items].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name': comparison = a.name.localeCompare(b.name); break;
      case 'price': comparison = a.price - b.price; break;
      case 'rating': comparison = a.rating - b.rating; break;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });
};

// --- СТАТИСТИКА ТОВАРОВ (СЕЛЕКТОР) ---
export const selectProductStats = (state: RootState) => {
  const products = state.products.items;
  return {
    total: products.length,
    available: products.filter(p => p.available).length,
    withDiscount: products.filter(p => p.hasDiscount).length,
    avgRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length || 0
  };
};

// --- КОМБИНАЦИЯ РЕДЬЮСЕРОВ И ИНИЦИАЛИЗАЦИЯ СТОР ---
const rootReducer = combineReducers({
  products: productsReducer,
  form: formReducer,
  ui: uiReducer
});

export const store = createStore(rootReducer);

// Динамически вычисляем RootState и экспортируем наружу для компонентов
export type RootState = ReturnType<typeof rootReducer>;
