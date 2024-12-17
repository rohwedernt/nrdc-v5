export async function updateUserSetting({
  userId,
  key,
  value,
}: {
  userId: string;
  key: string;
  value: string;
}): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, key, value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.error || 'Unknown error' };
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error in updateUserSetting:", error);
    return { success: false, message: 'Failed to update setting due to network error' };
  }
}
