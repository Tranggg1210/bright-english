const SALT_WORK_FACTOR = 10;

const USER_ROLE_ENUM = {
  USER: 'user',
  ADMIN: 'admin',
};

const ORDER_STATUS_ENUM = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  DELIVERING: 'delivering',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

const ORDER_ACTION_ENUM = {
  CREATED: 'created',
  CONFIRMED: 'confirmed',
  DELIVERING: 'delivering',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

const WEIGHT_JOURNEY_ENUM = {
  WEIGHTLOSS: 'WeightLoss',    
  WEIGHTGAIN: "WeightGain",
  WEIGHTMAINTENANCE: "WeightMaintenance"
}

const EXERCISE_TYPE = {
  WRITE: 'write',
  MATCH: 'match',
  DICTATION: 'dictation',
  MULTIPLE_CHOICE: 'multiple_choice',
};


module.exports = {
  USER_ROLE_ENUM,
  SALT_WORK_FACTOR,
  ORDER_STATUS_ENUM,
  ORDER_ACTION_ENUM,
  WEIGHT_JOURNEY_ENUM,
  EXERCISE_TYPE
};
