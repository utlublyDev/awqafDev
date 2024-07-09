
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class SubProvidersUpdateCommand : IRequest<SubProviders>
    {
        public SubProviders SubProviders { get; set; }
    }
}
