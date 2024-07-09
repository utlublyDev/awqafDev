
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class SubProvidersCreateCommand : IRequest<SubProviders>
    {
        public SubProviders SubProviders { get; set; }
    }
}
