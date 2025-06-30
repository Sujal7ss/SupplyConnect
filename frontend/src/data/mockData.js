// Mock users data
export const mockUsers = [
  {
    id: 'supplier-1',
    name: 'ABC Suppliers',
    email: 'supplier@example.com',
    password: 'password123',
    role: 'supplier',
    address: '123 Business Ave, New York, NY',
    phone: '(555) 123-4567',
    createdAt: '2023-01-15T08:30:00Z',
    rating: 4.8,
    reviewCount: 24,
    profileImage: 'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'driver-1',
    name: 'John Driver',
    email: 'driver@example.com',
    password: 'password123',
    role: 'driver',
    address: '456 Transport St, Chicago, IL',
    phone: '(555) 987-6543',
    createdAt: '2023-02-10T10:15:00Z',
    vehicleType: 'Truck',
    vehicleCapacity: '5 tons',
    licensePlate: 'TRK-4567',
    rating: 4.5,
    reviewCount: 32,
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock orders data
export const mockOrders = [
  {
    id: 'order-1',
    supplierId: 'supplier-1',
    status: 'pending',
    title: 'Electronics Delivery',
    description: 'Delivery of 200 smartphone units to retail store',
    pickupLocation: {
      address: '123 Warehouse Rd, Seattle, WA',
      coordinates: [-122.332, 47.606]
    },
    deliveryLocation: {
      address: '789 Retail Ave, Portland, OR',
      coordinates: [-122.676, 45.523]
    },
    items: [
      { name: 'Smartphones', quantity: 200, weight: '100kg' }
    ],
    weight: '100kg',
    dimensions: '5x5x8 ft',
    expectedPickupDate: '2023-06-15T09:00:00Z',
    expectedDeliveryDate: '2023-06-16T17:00:00Z',
    budget: 500,
    createdAt: '2023-06-10T14:30:00Z',
    bids: [
      {
        id: 'bid-1',
        driverId: 'driver-1',
        amount: 480,
        estimatedDeliveryDate: '2023-06-16T15:00:00Z',
        message: 'I can deliver this ahead of schedule',
        createdAt: '2023-06-11T10:15:00Z'
      }
    ],
    assignedDriverId: null,
    trackingHistory: []
  },
  {
    id: 'order-2',
    supplierId: 'supplier-1',
    status: 'in_progress',
    title: 'Office Furniture Delivery',
    description: 'Delivery of office desks, chairs and cabinets',
    pickupLocation: {
      address: '555 Furniture Way, Chicago, IL',
      coordinates: [-87.629, 41.878]
    },
    deliveryLocation: {
      address: '777 Corporate Blvd, Indianapolis, IN',
      coordinates: [-86.158, 39.768]
    },
    items: [
      { name: 'Desks', quantity: 10, weight: '300kg' },
      { name: 'Chairs', quantity: 20, weight: '200kg' },
      { name: 'Cabinets', quantity: 5, weight: '250kg' }
    ],
    weight: '750kg',
    dimensions: '12x8x8 ft',
    expectedPickupDate: '2023-06-20T08:00:00Z',
    expectedDeliveryDate: '2023-06-21T16:00:00Z',
    budget: 800,
    createdAt: '2023-06-12T11:45:00Z',
    bids: [],
    assignedDriverId: 'driver-1',
    trackingHistory: [
      {
        status: 'picked_up',
        location: {
          coordinates: [-87.629, 41.878],
          address: '555 Furniture Way, Chicago, IL'
        },
        timestamp: '2023-06-20T08:30:00Z'
      },
      {
        status: 'in_transit',
        location: {
          coordinates: [-87.232, 41.102],
          address: 'I-65 S, Lafayette, IN'
        },
        timestamp: '2023-06-20T11:15:00Z'
      }
    ]
  },
  {
    id: 'order-3',
    supplierId: 'supplier-1',
    status: 'completed',
    title: 'Grocery Delivery',
    description: 'Fresh produce delivery to supermarket',
    pickupLocation: {
      address: '333 Farm Rd, Fresno, CA',
      coordinates: [-119.772, 36.748]
    },
    deliveryLocation: {
      address: '444 Market St, San Francisco, CA',
      coordinates: [-122.419, 37.775]
    },
    items: [
      { name: 'Fresh Vegetables', quantity: 500, weight: '600kg' },
      { name: 'Fruits', quantity: 300, weight: '400kg' }
    ],
    weight: '1000kg',
    dimensions: '10x8x8 ft',
    expectedPickupDate: '2023-05-25T07:00:00Z',
    expectedDeliveryDate: '2023-05-25T18:00:00Z',
    budget: 650,
    createdAt: '2023-05-20T09:20:00Z',
    bids: [],
    assignedDriverId: 'driver-1',
    trackingHistory: [
      {
        status: 'picked_up',
        location: {
          coordinates: [-119.772, 36.748],
          address: '333 Farm Rd, Fresno, CA'
        },
        timestamp: '2023-05-25T07:15:00Z'
      },
      {
        status: 'in_transit',
        location: {
          coordinates: [-120.672, 37.225],
          address: 'Highway 99, Modesto, CA'
        },
        timestamp: '2023-05-25T10:30:00Z'
      },
      {
        status: 'delivered',
        location: {
          coordinates: [-122.419, 37.775],
          address: '444 Market St, San Francisco, CA'
        },
        timestamp: '2023-05-25T17:45:00Z'
      }
    ]
  }
];

// Available Orders for Drivers
export const mockAvailableOrders = [
  {
    id: 'order-4',
    supplierId: 'supplier-1',
    status: 'pending',
    title: 'Medical Supplies Delivery',
    description: 'Urgent delivery of medical supplies to hospital',
    pickupLocation: {
      address: '222 Pharma St, Boston, MA',
      coordinates: [-71.059, 42.360]
    },
    deliveryLocation: {
      address: '888 Hospital Ave, Providence, RI',
      coordinates: [-71.412, 41.823]
    },
    items: [
      { name: 'Medical Supplies', quantity: 50, weight: '200kg' }
    ],
    weight: '200kg',
    dimensions: '6x4x4 ft',
    expectedPickupDate: '2023-06-18T08:00:00Z',
    expectedDeliveryDate: '2023-06-18T12:00:00Z',
    budget: 400,
    createdAt: '2023-06-15T16:20:00Z',
    bids: [],
    assignedDriverId: null,
    trackingHistory: []
  },
  {
    id: 'order-5',
    supplierId: 'supplier-1',
    status: 'pending',
    title: 'Construction Materials',
    description: 'Delivery of construction materials to building site',
    pickupLocation: {
      address: '111 Warehouse Blvd, Dallas, TX',
      coordinates: [-96.797, 32.777]
    },
    deliveryLocation: {
      address: '555 Construction Site, Houston, TX',
      coordinates: [-95.369, 29.760]
    },
    items: [
      { name: 'Cement Bags', quantity: 100, weight: '5000kg' },
      { name: 'Steel Rods', quantity: 200, weight: '2000kg' }
    ],
    weight: '7000kg',
    dimensions: '20x8x8 ft',
    expectedPickupDate: '2023-06-22T07:00:00Z',
    expectedDeliveryDate: '2023-06-23T18:00:00Z',
    budget: 1200,
    createdAt: '2023-06-16T11:30:00Z',
    bids: [],
    assignedDriverId: null,
    trackingHistory: []
  }
];

// Mock messages data
export const mockMessages = [
  {
    id: 'msg-1',
    orderId: 'order-2',
    senderId: 'supplier-1',
    receiverId: 'driver-1',
    content: 'Please confirm when you\'ve picked up the items.',
    timestamp: '2023-06-19T15:30:00Z',
    read: true
  },
  {
    id: 'msg-2',
    orderId: 'order-2',
    senderId: 'driver-1',
    receiverId: 'supplier-1',
    content: 'Just picked up the furniture. Will keep you updated on my progress.',
    timestamp: '2023-06-20T08:35:00Z',
    read: true
  },
  {
    id: 'msg-3',
    orderId: 'order-2',
    senderId: 'driver-1',
    receiverId: 'supplier-1',
    content: 'Currently on I-65 S. Traffic is good, should arrive on schedule.',
    timestamp: '2023-06-20T11:20:00Z',
    read: false
  }
];

// Mock reviews data
export const mockReviews = [
  {
    id: 'review-1',
    orderId: 'order-3',
    reviewerId: 'supplier-1',
    revieweeId: 'driver-1',
    rating: 5,
    comment: 'Excellent service! Delivered on time and handled the goods with care.',
    createdAt: '2023-05-26T10:15:00Z'
  },
  {
    id: 'review-2',
    orderId: 'order-3',
    reviewerId: 'driver-1',
    revieweeId: 'supplier-1',
    rating: 4,
    comment: 'Good communication and everything was ready for pickup as promised.',
    createdAt: '2023-05-26T11:30:00Z'
  }
];