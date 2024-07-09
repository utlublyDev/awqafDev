
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ProvidersUpdateCommand : IRequest<Providers>
    {
        public Providers Providers { get; set; }
    }
}
