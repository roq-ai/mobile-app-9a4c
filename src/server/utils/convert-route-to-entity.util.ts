const mapping: Record<string, string> = {
  feedbacks: 'feedback',
  organizations: 'organization',
  'test-cases': 'test_case',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
