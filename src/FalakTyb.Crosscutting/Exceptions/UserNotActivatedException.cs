using System.Security.Authentication;

namespace awqaf.Crosscutting.Exceptions
{
    public class UserNotActivatedException : AuthenticationException
    {
        public UserNotActivatedException(string message) : base(message)
        {
        }
    }
}
