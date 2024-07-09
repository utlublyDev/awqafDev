using MediatR;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class UserGetAuthoritiesQuery : IRequest<IEnumerable<string>>
    {
    }
}
